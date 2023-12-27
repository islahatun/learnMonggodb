// ----------------------- DATABASE -----------------------//

/* 
mongodb tidak membuat database secara eksplisit tetapi pada mongdb memiliki konsep memilih database menggunakan use : pada mongodb defaultnya adalah test
ex : use belajar -> menggunakan/memilih database beajar, database ini belum tersimpan dalam dbms
kapan database ini tersimpan ? database ini akan tersimpan ketika memasukkan collaction di database
*/
db.dropDatabase() //menghapus database
db.getName() // mengambil nama database yang sedang digunakan
db.hostInfo() // mendapatkan informasi tentang host yang digunakan
db.version() // mendapatkan versi database yang digunakan


// ----------------------- COLLECTION (TABLE)-----------------------//

/* 
-> tempat menyimpan document (document sama dengan data/record/field pada sql)
-> maximum per dokumen yang bisa disimpan 16 MB
-> maximum level nested dokumen yang bisa disimpan 100 level (dokumen dalam dokumen)
*/

db.getCollectionNames() //mengambil semua nama collection
db.createCollection("name") // membuat collection baru name -> nama collection yang akan dibuat
db.getCollection("name") // mendapatkan object collection -> nama collection
db.name // sama dengan db.getCollection(name)
db.getCollectionInfos() // mendapatkan informasi semua conection collection

//collection method

db.collectionName.find() // mengambil semua document : collectionName -> nama collection yang diambil
db.collectionName.count() // mengambil jumlah document : collectionName -> nama collection yang diambil
db.collectionName.drop() // menghapus collection : collectionName -> nama collection yang diambil
db.collectionName.totalSize() // mengambil total ukuran collection : collectionName -> nama collection yang diambil
db.collectionName.stats() // mengambil informasi statistik colection  : collectionName -> nama collection yang diambil



// ----------------------- DATA MODELING ----------------------//
/*
-> schema yang flexible
    -> dapat memasukkan data ke collection secara langsung tanpa mendefinisikan schema collectionnya
    -> tiap document bisa berbeda
    -> namun pada prakteknya sangat di rekomendasikan menggunakan jenis data yang sama untuk setiap collection
-> primary key
    -> wajib memiliki primary key
    -> secara defauld primary key di setiap collection yaitu field _id
    -> hanya memiliki 1 primary key tidak boleh lebih lebih dari 1 
-> Struktur Document Embedded
    -> saat kita membutuhkan relasi sebuah data jika di bandingan dengan membuat collection yang berbeda kita dapat membuat embedded  document berupa object
    -> digunakan jika antar document saling ketergantungan
    -> digunakan jika tidak bisa langsung melakukan perubahan ke embedded document
    -> digunakan jika embedded document selalu dibutuhkan ketika mengambil data
-> Struktur Document Reference
    -> sama dengan sql, masing-masing collection harus memiliki field reference agar dapat dihubungkan
    -> digunakan jika antar document bisa berdiri sendiri dan tidak terlalu ketergantungan satu sama lain
    -> digunakan jika bisa melakukan manipulasi sata langsung terhadap reference document
    -> digunakan jika reference document tidak selalu dibutuhkan saat mengambil document
-> bahasa yang digunakan dalam mongodb adalah bson (Binary JSON)
 */

// ----------------------- TYPE DATA BSON ----------------------//
/*
double, string, object,array,binData(Binary data -> data file),objectId,bool,date,null, regex,javasript, javascriptWithScope, int,timestamp,long,decimal,minKey,maxKey

->objectId (_id)
    -> random data yang unik, cetpat untuk digenerate dan terurut
    -> Nilainya memiliki ukuran panjang 12 byte, konsisten terdiri dari informasi 4 byte timestamp, 5 byte random value, dan 3 byte increment counter
    -> digunakan sebagai default _id (primary key) didocument jika kita tidak secara explisit menyebutkan _id documentnya

 */