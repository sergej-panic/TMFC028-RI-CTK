kubectl component-info

helm install pma . -n components
helm uninstall pma -n components

kubectl config current-context
kubectl get pods -n components
kubectl get svc -n components
kubectl get exposedapis -n components

# see pervious log. Useful, for example, when node.js crashes
kubectl logs par-partyapi-5884c5777d-lcqpk -c par-partyapi --previous -n components

C:\projects\tmf\oda ctk\TMFC028-RI-CTK-ODA\TMFC028-PartyManagement\CTK\ComponentRI>helm package .
Successfully packaged chart and saved it to: C:\projects\tmf\oda ctk\TMFC028-RI-CTK-ODA\TMFC028-PartyManagement\CTK\ComponentRI\partymanagement-0.0.1.tgz

helm install my-release ./mychart-0.1.0.tgz

example
    helm install par partymanagement-0.0.1.tgz -n components

    NAME: par
    LAST DEPLOYED: Mon Nov 24 12:58:51 2025
    NAMESPACE: components
    STATUS: deployed
    REVISION: 1



helm registry login <nexus-host> --username <user> --password <pass>
helm push mychart-0.1.0.tgz oci://<nexus-host>/repository/<repo-name>


kubectl rollout restart deployment canvas-depapi-op -n canvas


