## Pharmacy Management System (Backend Component)
This is a phamarcy management system (PHMS) API application. 
It is intended as a backend support to a stand-alone PHMS frontend app.
This app is projected to provide computational, analytical and medical/admin data services to frontend. 


## General Note
This ReadMe file is presently a living document and will be updated at least throughout project dvelopment lifespan.


## How to Run
On project directory, execute command 
1. ```npm run dev``` to run program in dev mode
2. ```npm run test``` to test all endpoints
3. ...
4. ...
 

## TO DO:
1. Build all identified end-points (e.g., for poison, patient, user etc.);
2. Setup security feature;
3. ....
4. Rig up logging feature (use npm package "morgan") for this;


## Design Documentation
1. Models include User, Poison, Patient
2. Actors include: 
    Poison: ...
    Patient: ...
    Users:
        admin, privileges:
            - view real-time daily sales report
            - manage (view, add, delete, edit only) poison inventory
            - create user
        ph - pharmacist:
            - view real-time daily sales report
            - manage (view, add only) poison inventory
            - dispense poisons  
        asst - pharmacy assistant 
            - manage (view only) poison inventory
            - dispense poisons 


## Legend
de   -> Duplicate entry of (poison, user or patient) documents
sf   -> Saving failed for unknown reason
ipf  -> Inventory update failed
ipni -> Indicated Poison Not in Inventory
npi  -> No poison in inventory
iurl -> Invalid URL


## Brief Developer Note
1. Setup the poison property "barcode" as an index in the db. The system will not work correctly in the absence of this.
2. This phms backend service requires entries be provided for all properties (of poisons, patient, user)


## Details of Endpoints
1. All endpoints return response in object format with properties
   - status: tells if request to endpoint failed or succeeded
   - code: code summarizing what went wrong (only provided if request failed)
   - details: precise info what went wrong 


## Available endpoints and url request structure


## Note About Test
1. For now, test uses network and not mock until such a time network resources is considered too expensive