window.addEventListener("load",  (e) =>  {
    const proxyElem = document.querySelector("#proxy");
    let payload = null;

    proxyElem.addEventListener("send", (e) => {
        window.top.postMessage({
            source: 'storage-communicator',
            payload: payload,
        }, "*");
        payload = null;
    });

    window.addEventListener("storage", (e) => {
        window.top.postMessage({
            source: 'storage-communicator',
            payload: {
                operation: "set",
                key: e.key,
                oldValue: e.oldValue,
                newValue: e.newValue,
            }
        }, "*");
    });

    window.addEventListener("message", (event) => {
        const operation = event.data.hasOwnProperty('operation') ? event.data.operation : null;
        const key = event.data.hasOwnProperty('key') ? event.data.key : null;
        const value = event.data.hasOwnProperty('value') ? event.data.value : null;

        if (!["set", "get", "get_all"].includes(operation)) {
            payload = {"error": `Unexpected operation "${operation}".`};
            proxyElem.dispatchEvent(new Event("send"));
        } else if (key && !Object.keys(DEFAULT_SETTINGS).includes(key)) {
            payload ={"error": `Unknown property "${key}".`};
        } else if ((operation === "set" || operation === "get") && !key) {
            payload = {"error": `Can't ${operation} value for key "${key}".`};
            proxyElem.dispatchEvent(new Event("send", ));
        } else if (operation === "set") {
            const oldValue = localStorage.getItem(key);
            localStorage.setItem(key, value);
            payload = {
                operation: "set",
                key: key,
                oldValue: oldValue,
                newValue: value,
            };

            const storageEvent = new StorageEvent('storage', {
                key: key,
                oldValue: oldValue,
                newValue: value,
                url: window.location.href,
                storageArea: localStorage
            });
            window.dispatchEvent(storageEvent);

        } else if (operation === "get") {
            payload = {
                operation: "get",
                key: key,
                value: localStorage.getItem(key),
            };
        } else if (operation === "get_all") {
            const data = Object.keys(DEFAULT_SETTINGS).reduce((acc, key) => {
                acc[key] = localStorage.getItem(key);
                return acc;
            }, {});

            payload = {
                operation: "get_all",
                data: data,
            };
        }

        if (payload) {
            proxyElem.dispatchEvent(new Event("send"));
        }
    });
});


