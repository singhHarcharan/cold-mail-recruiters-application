import * as admin from 'firebase-admin';

// Initialize Firebase Admin
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
    console.log('Firebase Admin initialized successfully');
  } catch (error) {
    console.error('Firebase admin initialization error', error);
  }
}

export const verifyIdToken = async (token: string) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    // Get additional user data
    const userRecord = await admin.auth().getUser(decodedToken.uid);
    
    return { 
      uid: decodedToken.uid, 
      email: decodedToken.email,
      displayName: userRecord.displayName || '',
      photoURL: userRecord.photoURL || ''
    };
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
};

export default admin;
