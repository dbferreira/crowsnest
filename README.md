# Crow's Nest

> **Note:** This project is a work-in-progress.  It will be placed on the Android Play store and Apple App Store when complete.

Crow's Nest is a kid-friendly screen time management app that allows parents to set reasonable time limits to the amount of time kids spend in front of screens.

It is developed using React Native and stores all data on Google Firebase Firestore.  Authentication and push notifications are also done using Firebase.

## Preview
The following screenshots have been taken from the application running on an Android emulator.  It does not represent the final finished product.
### Login
![Login Page](./docs/login.png?raw=true "Login Page")
### Activities
![Activities](./docs/activities.png?raw=true "Activities")
### Edit Child
![Edit Child](./docs/editchild.png?raw=true "Edit Child")

## Roadmap
The following roadmap indicates the planned features and the current status of the project:

1. ~~Project setup~~
2. ~~Implement Firebase Authentication~~
3. ~~Login Page~~
4. ~~Implement Firebase Firestore~~
5. ~~Create **Child** *List*, *Create* and *Edit* views~~
6. ~~Create **Activity** *List*, *Create* and *Edit* Views~~
7. Allow switching between parent and child accounts (**WIP**)
8. Build Child dashboard screen
9. Build Activity selection screen
10. Add Screen-time type selection screen
11. Add *Timer Running* screen
12. Improve Parent dashboard
13. Implement Firebase Push Notifications
14. Add detailed business rules for time rewards and carry-overs
15. Add application logo and meta-data
16. Improve art-work on child-screens
17. Review, refactor and componentize existing code
18. Perform real-world testing and implement improvements
19. Add to Android Play Store
20. Add to Apple App Store

## Developing

After cloning the repo, perform the following to get started:
- `npm install`
- Comple Android solution using *Android Studio*
- `react-native start`
- `react-native run-android`
