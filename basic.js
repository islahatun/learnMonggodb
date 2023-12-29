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



// ----------------------- INSERT DOCUMENT ----------------------//

/*
-> membuat dokuemn dalam bentuk JSON
-> field _id idak wajib dimasukkan jika ingin membuat dengan type data objectId maka menggunakan perintah "new ObjectId()""
-> jika ingin membuat _id (objectId) baru sesuai dengan yang kita inginkan (
 */
// db.NameCollection.insertOne(document) -> menambhaan document ke collection

db.customers.insertOne({
    _id: "Iis",
    name: "Islahatun Nufusi"
});

db.orders.insertOne({
    _id: new ObjectId(), // tidak ditulis juga bisa 
    total: new NumberLong("8000"), // jika langsung menulis 8000 maka akan terbaca sebagai int
    items: [{
            product_id: 1,
            price: new NumberLong("2000"), // jika langsung menulis 8000 maka akan terbaca sebagai int
            quantity: new NumberInt("2") // dapat di tulis langsung 2
        },
        {
            product_id: 2,
            price: new NumberLong("2000"), // jika langsung menulis 8000 maka akan terbaca sebagai int
            quantity: new NumberInt("2") // dapat ditulis langsung 2
        }
    ]
});

// db.NameCollection.insertMany(array<document>) -> menambhaan semua document di array ke collection

db.product.insertMany([{
        _id: 1,
        name: "Indome Ayam Bawang",
        price: new NumberLong("2000"), // jika langsung menulis 8000 maka akan terbaca sebagai int
        category: "food"
    },
    {
        _id: 2,
        name: "Mie Sedap Soto",
        price: new NumberLong("2000"), // jika langsung menulis 8000 maka akan terbaca sebagai int
        category: "food"
    }
]);


// ----------------------- QUERY DOCUMENT DOCUMENT ----------------------//

//db.NameColllection.find(query) -> mencari document dengan query, jika tidak ada query maka sama dengan SELECT * FROM NameColllection

// SELECT * FROM customers WHERE id="Iis"
db.customers.find({
    _id: "Iis"
})

// SELECT * FROM orders WHERE items.product_id = 1
db.orders.find({
    "items.product_id": 1
})

//  ----------------------- COMPARISON OPERATOR ---------------------- //

/* 
-> $eq      = membandingkan value dengan value yang lain jika di sql operator ini adalah tanda (=)
-> $gt      = membandingkan value lebih besar dari value lain, jika di sql operator ini adalah tanda (>)
-> $gte     = membandingkan value lebih besar sama dengan dari value lain, jika di sql operator ini adalah tanda (>=)
-> $lt      = membandingkan value lebih kecil dari value lain, jika di sql operator ini adalah tanda (<)
-> $lte     = membandingkan value lebih besar sama dengan dari value lain, jika di sql operator ini adalah tanda (<=)
-> $in      = membandingkan value dengan value yang ada di array, jika di sql operator ini sama dengan nama in
-> $nin     = membandungkan value tidak ada dalam value yang ada di array
-> $ne      = membandingkan value tidak sama dengan value lain, jika dibandingkan dengan sql operator ini adalah tanda (<>)

db.NameCollection.find(
    {
        "nameDocument" :{
            $oprator: "value"
        }
    }
)
*/

// select * from customers where _id ="Iis"
db.customers.find({
    _id:{
        $eq:"Iis"
    }
})

//select* from products where price > 50000
db.products.find(
    {
        price:{
            $gt:50000
        }
    }
)

// select * from product where category in("handphone","laptop") and price > 500000 -> ambil semua data dari collection products dimana category nya handphone atau laptop dan price nya lrbih besar dari 500000
db.products.find({
    category:{
        $in:["handphone","laptop"]
    },
    price:{
        $gt:500000
    }
})

//  ----------------------- LOGICAL OPERATOR ---------------------- //

/* 
-> $and     = mengemalikan dukumen jika semua kondisi benar (menggabungkan query)
-> $or      = mengembalikan dokument jika salah satu kondisi benar (menggabungkan query)
-> $nor     = mengembalikan dokument yang gagal disemua kondisi (menggabungkan query)
-> $not     = mengembalikan dokument yang tidak sesuai dengan kondisi (membalikkan)

--> logical operator for $and,$or and $nor
db.NameCollection.find({
       $operator:[
        {
            query
        },{
            query
        }
       ]
    })

--> logical operator for $not
db.NameCollection.find({
       field:{
        $not:{
            query
        }
       }
    })
*/

// select * from products where category in ("handphone","laptop") and price > 500000
db.products.find({
    $and:[
        {category:$in("handphone","laptop")},
        {price:{$gt:500000}}
    ]
})

// select * from products where category noy in ("handphoone","laptop")
db.products.find({
    category:{
        $not:{$in:['handphone','laptop']}
    }
})

// select * from products where price between 10000 and 20000 and category != 'food'
db.products.find({
    price:{
        $gte:10000,
        $lte:20000
    },
    catgeory:{
        $ne:"food"
    }
})
// atau bisa juga
db.products.find({
    $end:[
        {price:{$gte:10000,$lte:20000}},
        {category:{$ne:"food"}}
    ]
})