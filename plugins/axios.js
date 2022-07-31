export default function ({ $axios, redirect }) {

    $axios.defaults.timeout = 100000;

    $axios.onRequest((config) => {
        // console.log('Making request to ' + JSON.stringify(config));
    });

    $axios.onResponse(response => {
        return Promise.resolve(response);
    });

    $axios.onError((error) => {
        const code = parseInt(error.response && error.response.status)
        if (code === 400) {
            redirect('/400')
        }
        return Promise.reject(error.response);
    });
}