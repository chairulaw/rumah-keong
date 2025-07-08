// DBML for MySQL-compatible schema with timestamps and toko owner FK

Enum role {
  Penjual
  Pembeli
  Admin
}

Enum status {
  pending
  paid
  proses
  dikirim
  diterima
  selesai
}

Table users {
  id int [pk, increment]
  email varchar [not null, unique]
  password varchar [not null]
  nama varchar
  no_hp varchar
  alamat text
  role role [default: 'Pembeli']
  created_at datetime [default: `CURRENT_TIMESTAMP`]
  updated_at datetime [default: `CURRENT_TIMESTAMP`]

  Note: 'Users table holds the user data with roles.'
}

Table tokos {
  id int [pk, increment]
  owner_id int [ref: > users.id]
  nama varchar [not null]
  alamat text
  deskripsi text
  no_hp varchar
  email varchar
  created_at datetime [default: `CURRENT_TIMESTAMP`]
  updated_at datetime [default: `CURRENT_TIMESTAMP`]

  Note: 'Tokos table contains shop/store data and references the owner (Penjual).'
}

Table produks {
  id int [pk, increment]
  toko_id int [ref: > tokos.id]
  nama varchar [not null]
  deskripsi text
  harga decimal
  stok int
  created_at datetime [default: `CURRENT_TIMESTAMP`]
  updated_at datetime [default: `CURRENT_TIMESTAMP`]

  Note: 'Produks table contains product data from each toko.'
}

Table transaksis {
  id int [pk, increment]
  kode_transaksi char(36) [default: `UUID()`]
  pembeli_id int [ref: > users.id]
  payment_method varchar
  total decimal
  status status
  tanggal_bayar datetime
  created_at datetime [default: `CURRENT_TIMESTAMP`]
  updated_at datetime [default: `CURRENT_TIMESTAMP`]

  Note: 'Transaksis table records each transaction made by pembeli.'
}

Table detail_transaksis {
  id int [pk, increment]
  transaksi_id int [ref: > transaksis.id]
  produk_id int [ref: > produks.id]
  quantity int
  harga_satuan decimal
  sub_total decimal
  created_at datetime [default: `CURRENT_TIMESTAMP`]
  updated_at datetime [default: `CURRENT_TIMESTAMP`]

  Note: 'Details of each transaction including product and amount.'
}
