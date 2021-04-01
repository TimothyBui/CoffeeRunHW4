(function (window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;

    var firebaseConfig = {
        apiKey: "AIzaSyBS1OOlIoOh1RE2KfminPqgKTe-TqQmKCg",
        authDomain: "coffeerun-hw44.firebaseapp.com",
        databaseURL: "https://coffeerun-hw44-default-rtdb.firebaseio.com/",
        projectId: "coffeerun-hw44",
        storageBucket: "coffeerun-hw44.appspot.com",
        messagingSenderId: "215445241413",
        appId: "1:215445241413:web:06839414a4d90036cead2c"
      };
    

    firebase.initializeApp(firebaseConfig);

    class RemoteDataStore {
        constructor() {
            console.log('running the Firestore function');
            this.db = firebase.firestore();
        }

        add(key, val) {
            const ordersRef = this.db.collection('Orders');
            ordersRef.doc(key).set(val).then((ref) => {
                console.log("Added doc with ID: ", key);
            });
        }

        remove(key) {
            const ordersRef = this.db.collection('Orders');
            ordersRef.doc(key).delete().then(() => console.log("Order for ", key, " deleted"))
                .catch((error) => console.error("Error deleting document", error));
        }

        get(key) {
            console.log('Retrieving order with key: ', key);
            const ordersRef = this.db.collection('Orders');
            const specificOrder = ordersRef.doc(key);

            specificOrder.get().then((doc) => {
                if (!doc.exists) {
                    return;
                } else {
                    return doc.data();
                }
            })
        }

        async getAll() {
            console.log('Retrieving all orders');
            const ordersRef = this.db.collection('Orders');
            const snapshot = await ordersRef.get();
            return snapshot.docs.map(doc => doc.data());
        }
    }

    App.RemoteDataStore = RemoteDataStore;
    window.App = App;

})(window);
