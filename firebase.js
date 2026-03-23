const firebaseConfig = {
    apiKey: "AIzaSyB6tZwiA21WQN2i3Y-R2e3w7Z9mFBw7gIA",
    authDomain: "harish-ea1a4.firebaseapp.com",
    projectId: "harish-ea1a4",
    storageBucket: "harish-ea1a4.firebasestorage.app",
    messagingSenderId: "427963134272",
    appId: "1:427963134272:web:5f331543de088a9e364aa5",
    measurementId: "G-P88MLE0WJ4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

window._db = db; // Export db globally for easier access

window._firebase = {
    // Invoice Operations
    addInvoice: async (bill) => {
        try {
            const docRef = await db.collection("invoices").add({
                ...bill,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
            console.log("Invoice added with ID: ", docRef.id);
            // Also store in local history for backward compatibility if needed, 
            // but we'll primarily use Firebase now.
            return docRef;
        } catch (error) {
            console.error("Error adding invoice: ", error);
            throw error;
        }
    },
    getInvoices: async () => {
        try {
            const snapshot = await db.collection("invoices").orderBy("timestamp", "desc").get();
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error("Error getting invoices: ", error);
            throw error;
        }
    },

    // Customer Operations
    addCustomer: async (customer) => {
        try {
            const docRef = await db.collection("customers").add(customer);
            return docRef;
        } catch (error) {
            console.error("Error adding customer: ", error);
            throw error;
        }
    },
    getCustomers: async () => {
        try {
            const snapshot = await db.collection("customers").get();
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error("Error getting customers: ", error);
            throw error;
        }
    },
    updateCustomer: async (id, data) => {
        try {
            await db.collection("customers").doc(id).update(data);
        } catch (error) {
            console.error("Error updating customer: ", error);
            throw error;
        }
    },
    deleteCustomer: async (id) => {
        try {
            await db.collection("customers").doc(id).delete();
        } catch (error) {
            console.error("Error deleting customer: ", error);
            throw error;
        }
    }
};
