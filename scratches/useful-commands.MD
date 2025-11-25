####### Just a scratch of some useful commands ########

kubectl component-info

helm install pma . -n components
helm uninstall pma -n components

kubectl config current-context
kubectl get pods -n components
kubectl get svc -n components
kubectl get exposedapis -n components

# see pervious log. Useful, for example, when node.js crashes
kubectl logs par-partyapi-5884c5777d-lcqpk -c par-partyapi --previous -n components

helm package .

helm install my-release ./mychart-0.1.0.tgz

helm install par partymanagement-0.0.1.tgz -n components

helm registry login <nexus-host> --username <user> --password <pass>

helm push mychart-0.1.0.tgz oci://<nexus-host>/repository/<repo-name>


kubectl rollout restart deployment canvas-depapi-op -n canvas


