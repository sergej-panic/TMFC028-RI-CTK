
'use strict';

const util = require('util')
const assert = require('assert');

const queryToMongo = require('query-to-mongo');
const querystring = require('querystring');

const MongoClient = require('mongodb').MongoClient;

const {getResponseType, getPayloadType, getTypeDefinition} = require('./swaggerUtils');

var mongodb = null; 

/* connection helper for running MongoDb from url */
function connectHelper(callback) {
  var releaseName = process.env.RELEASE_NAME; // Release name from Helm deployment
  var credentials_uri = "mongodb://" + releaseName + "-mongodb:27017/tmf";
//  var credentials_uri = "mongodb://localhost:27017/tmf";
  let options = {
    useNewUrlParser: true 
  };
  MongoClient.connect(credentials_uri, options, function (err, db) {
    if (err) {
      mongodb = null;
      callback(err,null);
    } else {
      mongodb = db.db("tmf");
      callback(null,mongodb);
    }
  });
}


function getMongoQuery(req) {
  var res;
  if(req instanceof Object) {
    res = queryToMongo(req._parsedUrl.query);
//    console.log('[MongoQuery] Parsed from _parsedUrl:', req._parsedUrl.query);
  } else {
    res = queryToMongo(querystring.parse(req));
//    console.log('[MongoQuery] Parsed from querystring:', req);
  }
//  console.log('[MongoQuery] Initial criteria:', JSON.stringify(res.criteria));

  if(res!==undefined && res.options!==undefined && res.options.fields!==undefined) {
    res.options.fields.href = true;
    res.options.fields.id = true;
  }

  //
  // test for date-time in query and allow partial equality matching, e.g. ="2018-08-21"
  //
  try {
    const requestType = getPayloadType(req);
//    console.log('[MongoQuery] Payload type:', requestType);

    const properties = Object.keys(res.criteria);
//    console.log('[MongoQuery] Query properties:', properties);

    var typeDefinition = getTypeDefinition(requestType);
//    console.log(`[MongoQuery] type definition: ${typeDefinition}`)
    // fallback if no swagger definition
    if (!typeDefinition) {
//      console.warn(`[MongoQuery] No type definition found for payload type '${requestType}', applying fallback for known fields.`);
      typeDefinition = {};
    }

    if(typeDefinition.properties!==undefined) {
      typeDefinition = typeDefinition.properties;
    }

    properties.forEach(prop => {
//      console.log(`[MongoQuery] Inspecting property: ${prop}`);
      var paramDef = typeDefinition[prop];
      if((paramDef!==undefined && paramDef.type === "string" && paramDef.format === "date-time") || ["orderDate"].includes(prop)) {
        const originalValue = req._parsedUrl?.query?.split('&').find(kv => kv.startsWith(`${prop}=`))?.split('=')[1];
        const rawValue = decodeURIComponent(originalValue || res.criteria[prop]);

//        console.log(`[MongoQuery] Found date-time param: ${prop}=${rawValue}`);

        if (!isNaN(Date.parse(rawValue))) {
          res.criteria[prop] = { $regex: '^' + rawValue };
//          console.log(`[MongoQuery] Applied regex filter on ${prop}:`, res.criteria[prop]);
        }
//        const propVal = res.criteria[prop];
//        console.log(`[MongoQuery] Found date-time param: ${prop}=${propVal}`);
        // equality test if not the value is an object
//        if(!(propVal instanceof Object)) {
//          if(!isNaN(Date.parse(propVal))) {
//            res.criteria[prop] = {$regex: '^' + propVal + '.*' };
//            console.log(`[MongoQuery] Applied regex filter on ${prop}:`, res.criteria[prop]);
//          }
//        }
      }
    });
  }
  catch(err) {
    // ignore for now
//    console.error('[MongoQuery] Error in query filtering logic:', err.message);
  }

  res.options.projection = res.options.fields;
  delete res.options.fields;

  return(res);

};

function quotedString(s) {
  return s;
};

function connectDb(callback) {
  if(mongodb) {
      mongodb.stats(function(err, stats) {
        if(stats != null) {
          callback(null,mongodb);
        } else {
          connectHelper(callback);
        }
      });
  } else {
    connectHelper(callback);
  }
};

function connect() {
  return new Promise(function(resolve,reject) {
      connectDb(function(err,db) {
        if(err!=null || db==null) {
          reject(err);
        } else {
          resolve(db);
        };
      });
    });
};

function sendDoc(res,code,doc) {
  // delete internal mongo _id from all documents
  if(Array.isArray(doc)) {
    // remove _id from all documents
    doc.forEach(x => {
      delete x._id;
    });
  } else {
    delete doc._id;
  }

  if(doc.href) {
    res.setHeader('Location',  doc.href);
  }

  res.statusCode = code;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(doc));
}


module.exports = { connect, connectDb, getMongoQuery, sendDoc };


