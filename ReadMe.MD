# Pharmacy Management System (Backend App)
This is a phamarcy management system API application. It provides backend support to a stand-alone frontend app. 


## How to Run
1. **


## TO DO:
1. Build all identified end-points;
2. Setup security feature;
3. *****
4. Rig up logging feature (use npm package morgan) for this;


## Design Documentation
1. Models include User, Poison
2. Users
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