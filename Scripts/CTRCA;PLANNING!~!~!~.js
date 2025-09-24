if (matches(currentUserID, "ADMIN")) {
showDebug = false;
showMessage = false;
}
include("EMSE:SetContactRelationshipToContactType");
closeTask("Application Intake","Accepted","Updated via EMSE","");
activateTask("Public Notice");