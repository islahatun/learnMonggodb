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
});

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
);
*/

// select * from customers where _id ="Iis"
db.customers.find({
    _id: {
        $eq: "Iis"
    }
});

//select* from products where price > 50000
db.products.find({
    price: {
        $gt: 50000
    }
});

// select * from product where category in("handphone","laptop") and price > 500000 -> ambil semua data dari collection products dimana category nya handphone atau laptop dan price nya lrbih besar dari 500000
db.products.find({
    category: {
        $in: ["handphone", "laptop"]
    },
    price: {
        $gt: 500000
    }
});

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
    });

--> logical operator for $not
db.NameCollection.find({
       field:{
        $not:{
            query
        }
       }
    });
*/

// select * from products where category in ("handphone","laptop") and price > 500000
db.products.find({
    $and: [{
            category: $in("handphone", "laptop")
        },
        {
            price: {
                $gt: 500000
            }
        }
    ]
});

// select * from products where category noy in ("handphoone","laptop")
db.products.find({
    category: {
        $not: {
            $in: ['handphone', 'laptop']
        }
    }
});

// select * from products where price between 10000 and 20000 and category != 'food'
db.products.find({
    price: {
        $gte: 10000,
        $lte: 20000
    },
    catgeory: {
        $ne: "food"
    }
});
// atau bisa juga
db.products.find({
    $end: [{
            price: {
                $gte: 10000,
                $lte: 20000
            }
        },
        {
            category: {
                $ne: "food"
            }
        }
    ]
});

// ----------------------- ELEMENT OPERATOR ---------------------- //
/*
-> $exists  : mencocokan document yang memiliki atribut field yang sama dengan yang akan dibandingkan
-> $type      : mencocokan documeny yang memiliki type field yang sama dengan yang akan dibandingkan

db.customers.find({
    field:{
        $operator : value
    }
});
 */

// select * from products where category is null
db.products.find({
    category: {
        $exsists: false
    }
});

//select * from products where type( category) = 'string'
db.products.find({
    category: {
        $type: "string"
    }
});

// select* from produts where type(price) in ('int','long')
db.products.find({
    price: {
        $type: ['int', 'long']
    }
});

// ----------------------- EVALUATION QUERY OPERATOR ---------------------- //
/*
-> $expr            : menggunakan aggregation operator
-> $jsonSchema      : validasi document sesuai dengan JSON schema
-> $mod             : melakukan operasi moldulo
-> $regex           : mengambil documney sesuai dengan regular expression (PCRE) jika di sql sama seperti like
-> $text            : melkaukan pencarian menggunakan text
-> $where           : mengambil document dengan javasript function (tidak bisa dijalankan di mongoshell)

 */

// select * from customers where _id = name
db.customers.find({
    $expr: {
        $eq: ['$_id', '$name']
    }
});


/* ------------ $$jsonSchema ------------ */
// select * from products where name s not  null and catgeory is not null
db.products.find({
    $jsonSchema: {
        required: ['name', 'category']
    }
});

// select * from products where name is not null and type (name) = "string" and type(price) = "number"
db.products.find({
    $jsonSchema: {
        required: ['name'],
        properties: {
            name: {
                type: "string"
            },
            price: {
                type: "number"
            }
        }
    }
});

/* ------------ $mod ------------ */
// select * from products where price % 5 = 0
db.products.find({
    price: {
        $mod: [5, 0]
    }
});

/* ------------ $regex ------------ */
// select * from products where name like "%mie%"
db.products.find({
    name: {
        $regex: /mie/,
        $options: "i" // "i" maksudnya adalah in case sensitive (besar kecil huruf tidak diperhatikan)
    }
});

// select * from products where name like "Mie%" ( yang depannya Mie)
db.products.find({
    name: {
        $regex: /^Mie/,

    }
});

/* ------------ $where ------------ */
// select * from customers where _id = name
db.customers.find({
    $where: function () {
        return this._id = this.name
    }
});

// ----------------------- ARRAY QUERY OPERATOR ---------------------- //
/*
-> $all            : Mencocokan array yang mengandung element - element tertentu
-> $elemMatch      : Mengambil document jika tiap element di array memenuhi kondisi tertentu
-> $size           : Mengambil document jika ukuran array sesuai

 */


/* ------------ $all ------------ */
//  select * products where category = "handphone" and category ="laptop"
db.products.find({
    category: {
        $all: ['handphone', 'laptop']
    }
});

/* ------------ $elemMatch ------------ */
// select * products where in category ('handphone','laptop')
db.products.find({
    category: {
        $elemMatch: {
            $in: ['handphone', 'laptop']
        }
    }
});

/* ------------ $size ------------ */
// select * products where count(category) = 3
db.products.find({
    category: {
        $size: 3
    }
});

// ----------------------- PROJECTION OPERATOR ---------------------- //
/*
-> Pada function find, terdapat parameter kedua setelah query, yaitu projection
-> projection adalah memilih field mana yang ingin kita ambil atau hide  (field apa saya yang akan ditampilkan)

db.NamaCollection.find(query,projection)

-> $            = Limit array hanya mengembalikan data pertama yang match dengan array operator
-> $elemMatch   = Limit array hanya mengembalikan data pertama yang match dengan kondisi query
-> $meta        = Mengembalikan informasi metadata yang didapat dari setiap matching document
-> $slice       = mengontrol jumlah data yang ditampilkan pada array

 */
// select _id,name,category from products
db.products.find({}, {
    name: 1, // 1 -> penanda bahwa name kita tampilkan
    category: 1 // 1 -> penanda bahwa category kita tampilkan
})
// select _id,name,price from products
db.products.find({}, {
    catgory: 0 // 0 -> penanda bahwa category tidak kita tampilkan
})


/* ------------ $elemMatch ------------ */
//  select _id,name,category[first] from product -> tampilkan _id,name, 1 data category yang sama dengan data array yang diinginkan dari table product
db.products.find({}, {
    name: 1,
    category: {
        $elemMatch: {
            $in: ['Food', 'Electronik']
        }
    }
});

/* ------------ $elemMatch ------------ */
//  select _id,name,category[first] from product where category is not null-> tampilkan _id,name, 1 data category paling depanyang sama dengan yang diinginkan dari table product

db.products.find({
    category: {
        $exsists: true
    }
}, {
    name: 1,
    "category.$": 1
})

/* ------------ $slice ------------ */
//  select _id,name,category[0-1] from product where category is not null-> tampilkan _id,name, 2 data category paling depan yang sama dengan yang diinginkan dari table product

db.products.find({
    category: {
        $exsists: true
    }
}, {
    name: 1,
    category: {
        $slice: 2
    }
})


// ----------------------- QUERY MODIFIER ---------------------- //
/*
-> Query modifier adalah memodifikasi hasil query yang telah dilakukan, contohnya : mengubah query menjadi jumlah data, membatasi jumlah data dengan paging dll

-> count()      = mengambil jumlah daya yang didapat dari query
-> limit(size)  = membatasi jumlah data yang didapat dari query
-> skip(size)   = Menghiraukan data pertama hasil query seejumlah yang ditentukan
-> slice       = mengurutkan hasil data query (asc,desc)

 */

// select count(*) from product
db.products.find({}).count()

// select * from products limit 4
db.products.find({}).limit(4)

// select * from products offset 2
db.products.find({}).skip(2)

// select * from products limit 4 offset 2
db.products.find({}).limit(4).skip(2)

// seelct * from product by category asc, name desc
db.products.find({}).sort({
    category: 1, //asc
    name: -1 // desc
})

// ----------------------- UPDATE DOCUMENT ---------------------- //
/*

-> updatOne()   = mengubah 1 document
-> updateMany() = mengubah banyak document sekaligus
-> replaceOne   = Mengubah total 1 document dengan document baru

db.NameCollection.syntaxUpdate(
    {}, filter
    {}, update
    {}, options
)

 */

/* ------------ updateOne() ------------ */
//update product set category = "food" where _id = 1
db.products.updateOne({
    _id: 1
}, {
    $set: {
        category: "food"
    }
})

/* ------------ updateMany() ------------ */
//update product set category = "food" price > 30000 and category is not null
db.products.updateMany({
    $and: [{
        price: {
            $gt: 30000
        },
        category: {
            $exsists: true,
        }
    }]

}, {
    $set: {
        category: ["food"]
    }
});

// ----------------------- UPDATE DOCUMENT FUNCTION ---------------------- //
/*

-> $set         : mengubah nilai field di document,
-> $unset       : menghapus field di document
-> $rename      : mengubah nama field di document,
-> $inc         : menaikan nilai number di field sesuai dengan jumlah tertentu (increment)
-> $currentDate : mengubah field menjadi waktu saat ini


 */

/* ------------ $set ------------ */
//update product set stock = 0
db.products.updateMany({}, {
    $set: {
        stock: 0
    }
})

/* ------------ $inc ------------ */
//update product set stock = stock + 1
db.products.uppdateMany({}, {
    $inc: {
        stock: 10 // nilai positif untuk naik nilai negatif untuk turun contoh 10 -> maka naik 10, -10 -> maka turun 10
    }
});

/* ------------ $rename ------------ */
//alter table customers change name full_name
db.customers.updateMany({},{
    $rename:{
        name:"fullName"
    }
});

/* ------------ $unset ------------ */
//alter table customers drop column wrong
db.customers.updateMany({},{
    $unset:{
        wrong:""
    }
});

/* ------------ $currentDate ------------ */
//update products set lastModifiedDate = current_date()
db.products.updateMany({},{
    $currentDate:{
        lastModifiedDate:{
            $type:"date"
        }
    }
});

// ----------------------- ARRAY UPDATE OPERATOR ---------------------- //
/*

-> secara default, saat kita mengubah field dengan type data array, maka seluruh array akan diubah
-> kadang kita ingin menambah, atau hanya mengubah data array tanda harus mengubah selruh field array

-> $set         : mengubah nilai field di document,
-> $unset       : menghapus field di document
-> $rename      : mengubah nama field di document,
-> $inc         : menaikan nilai number di field sesuai dengan jumlah tertentu (increment)
-> $currentDate : mengubah field menjadi waktu saat ini


 */