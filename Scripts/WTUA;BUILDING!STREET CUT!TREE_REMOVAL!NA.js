logDebug(wfTask + " " + wfStatus);

logDebug("Executing WTUA:Building/Street Cut/Tree_Removal/NA");
logDebug("Technical Review"+" "+(wfTask == "Technical Review" && wfStatus == "Revisions Required"));
if (wfTask == "Technical Review" && wfStatus == "Revisions Required") {
    updateFee("ABCARTSA01", "ABC_ARTS_APP", "FINAL", 5, "Y");
    logDebug("Executed updateFee");
}
logDebug("Inspection"+" "+(wfTask == "Permit Issuance" && wfStatus == "Issued"));
if (wfTask == "Inspection" && wfStatus == "In Progress") {
     // Define inspections with days ahead to schedule
    var inspectionsToSchedule = [
        { type: "SR_TEST", daysAhead: 0 },        // schedule today
        { type: "To be Defined", daysAhead: 0 }   // schedule today
    ];

    for (var i in inspectionsToSchedule) {
        var insp = inspectionsToSchedule[i];
        scheduleInspection(insp.type, insp.daysAhead);
    }
}
// --- Generic EMSE Script for Workflow Task Update ---
try {
    // Retrieve necessary environment variables
    var wfTask = aa.env.getValue("WorkflowTask");
    var wfStatus = aa.env.getValue("WorkflowStatus");
    var capId = aa.env.getValue("CapId");

    // Define the target workflow task and status
    var targetTask = 'Application Intake';
    var targetStatus = 'Accepted';

    // Check if the current workflow task and status match the target
    if (wfTask == targetTask && wfStatus == targetStatus) {
  
                // Update application status if no outstanding fees
                updateAppStatus('Record created', 'Updated via script');
                logDebug('Application status updated to Record created.');
          
    }
} catch (err) {
    logDebug('A JavaScript Error occurred: ' + err.message);
    logDebug(err.stack);
}
