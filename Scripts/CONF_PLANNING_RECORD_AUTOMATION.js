{
  "Planning/Pre-App Consult/NA/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "metadata": {
          "description": "Create parent Project record when needed",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Meeting"
          ],
          "status": [
            "Complete - Create Project"
          ]
        },
        "action": {
          "createParent": "Planning/Project/NA/NA"
        },
        "postScript": ""
      }
    ]
  },
  "Planning/Site Plan/Major/NA": {
    "ConvertToRealCapAfter": [
      {
        "metadata": {
          "description": "test records",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "customFields": {},
          "task": [],
          "status": [],
          "workFlow": {},
          "isCreatedByACA": true,
          "isACAEvent": true,
          "recordStatus": "",
          "balanceAllowed": true
        },
        "action": {
          "activateTask": [
            "Public Notice"
          ],
          "daysOut": "10",
          "useCalendarDays": false,
          "updateTask": [
            {
              "task": "Application Intake",
              "status": "Accepted"
            }
          ]
        },
        "postScript": ""
      }
    ]
  }
}