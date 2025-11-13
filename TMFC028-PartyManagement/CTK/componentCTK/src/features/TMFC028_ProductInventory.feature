@tmfc028
Feature: Dependent API interaction testing for tmfc028 - Pary

  Scenario Outline: Test dependent API interactions with different payloads  
    Given the CTK target component "<componentUnderTest>" with exposed API ID "<exposedApiId>" and dependent API ID "<dependentApiId>" has been installed successfully
    And the supporting stub "<dependentComponent>" for API "<dependentAPI>" has been installed successfully
    Given the dependent API stub "<dependentAPI>" is initialized with the payload defined in file "<basePayload>"
    When a "<resourceType>" with "<resourceFieldPath>" on payload defined in file "<targetPayload>" is created in API "<exposedAPI>" expecting "<expectedResponse>"
    Then expected response for operation "<operationID>" should be "<expectedResponse>"

  Examples:
    | componentUnderTest | dependentComponent   | resourceType          | exposedApiId  | exposedAPI   | dependentApiId | dependentAPI          | basePayload                | targetPayload             | resourceFieldPath          | operationID        | expectedResponse |
    | tmfc028            | permission           | organization          | TMF632        | organization | TMF669         | partyRole             | party-role-0001.json       | party-target-0001.json    | relatedParty[0]            | createOrganization | success          |
    | tmfc028            | permission           | organization          | TMF632        | organization | TMF669         | partyRole             | party-role-0001.json       | party-target-0002.json    | relatedParty[0]            | createOrganization | failure          |