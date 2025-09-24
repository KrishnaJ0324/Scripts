if (wfTask.equals("Decision Notification") && wfStatus.equals("Notification Sent")){
    closeTask("Appeal Period","Decision Sustained","Updated via EMSE","");
    closeTask("Case Complete","Closed - Approved","Updated via EMSE","");
}