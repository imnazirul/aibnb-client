self.addEventListener('fetch', function (event) {
    let token = localStorage.getItem("token") ?? "";
    const newRequest = new Request(event.request, {
        headers: {"Authorization": "Bearer " + token, "Content-Type": "multipart/form-data"},
        mode: "cors"
    });
    return fetch(newRequest);
});