export default function ({ $axios, store, redirect }) {

    $axios.defaults.timeout = 100000;

    $axios.onRequest((config) => {
        store.commit("view/setLoadingFlg", true);
    });

    $axios.onResponse(response => {
        store.commit("view/setLoadingFlg", false);
        return Promise.resolve(response);
    });

    $axios.onError((error) => {
        store.commit("view/setLoadingFlg", false);
        const code = parseInt(error.response && error.response.status)
        if (code === 400) {
            redirect('/400')
        }
        return Promise.reject(error);
    });

    $axios.onResponseError((error) => {
        store.commit("view/setLoadingFlg", false);
        return Promise.reject(error);
    });
}