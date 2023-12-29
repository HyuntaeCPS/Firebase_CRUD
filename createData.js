//Create Data
function createData() {
    let data = {
        nama: namaV.value,
        npm: npmV.value
    };
    database.ref("datamahasiswa").push(data);
    namaV.value = "";
    npmV.value = "";
}
