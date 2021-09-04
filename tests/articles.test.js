const request = require("supertest");
const app = require("../app");
const { Article } = require('../models')

afterAll((done) => {
  Article.destroy({ where: {
    author: 'hilman'
  } })
    .then(() => {
      done()
    })
    .catch(err => {
      done(err)
    })
})
describe("testing POST /articles", function(){
  describe("success", function(){
    it("status code 200", function(done){
      const body = {
        title: 'Fakta soal Perang Antarsuku di Adonara, NTT, yang Tewaskan 6 Orang',
        body: 'ADONARA- Sengketa tanah di kebun Wulen Wata, Pantai Bani, Desa Baobage, Kecamatan Witihama, Kabupaten Flores Timur, Nusa Tenggara Timur (NTT), berbuntut panjang.\nSaling klaim lahan itu hingga terjadi perang suku antara Suku Kwaelaga dan suku Lamatokan, Kamis (5/3/2020) sekitar pukul 10.45 WITA.\n6 Orang Tewas\nKejadian ini mengakibatkan enam orang meninggal dunia masing-masing dua orang dari suku Lamatokan dan empat orang dari suku Kwaelaga.\nKorban dari suku Lamatokan diketahui berasal dari Desa Tobitika, Kecamatan Witihama dan satunya dari Desa Sandosi. Sementara korban dari Suku Kwaelaga semuanya berasal dari Desa Sandosi, Kecamatan Witihama.\nKorban meninggal dunia yakni Wilem Kewasa Ola (80) dari Desa Tobitika dan Yosep Helu Wua (80), warga Desa Sandosi Kecamatan Witihama. Keduanya berasal dari suku Lamatokan.\nSementara empat orang korban dari suku Kwaelaga yakni Moses Kopong Keda (80), Jak Masan Sanga (70), Yosep Ola Tokan (56) dan Seran Raden (56).\nSementara Suban Kian (69), warga Desa Sandosi, Kecamatan Witihama yang juga dari suku Kwaelaga berhasil melarikan diri.\nSaling Klaim Lahan\nInformasi yang dihimpun, kalau masing-masing korban mendatangi lokasi kebun Wulen Wata. Kedua belah pihak diketahui sudah lama bersengketa masalah lahan tersebut sejak tahun 1990-an. \nMasing-masing pihak mendatangi lokasi kebun tersebut kemudian saling menyerang sehingga menimbulkan korban dari kedua belah pihak.\nKedua suku berada di dalam Desa Sandosi, Kecamatan Witihama. Awalnya masing-masing menempati lokasi yang ada. Suku Lamatokan berada di Sandosi 2 dan Suku Kwaelaga di Sandosi 1 dan digabung menjadi satu Desa yaitu Desa Sandosi l, Kecamatan Witihama, Kabupaten Flores Timur.\nBaik Suku Lamatokan maupun suku Kwaelaga saling klaim lokasi tersebut. Kedua suku sudah berulangkali difasilitasi oleh pemerintah Kecamatan Witihama dan Kapolsek Adonara untuk penyelesaian namun belum menemukan jalan keluar. \nSebelumnya pada, Kamis (27/2/2020) tujuh orang dari Suku Kwaelaga ke lokasi sengketa untuk melakukan kegiatan/berkebun menanam anakan jambu mete dan kelapa yang selama ini digarap oleh Suku Wuwur dan Suku Lamatokan. \nKegiatan yang dilakukan oleh Suku Kwaelaga tersebut menimbulkan kekecewaan dari Suku Lamatokan.\nBuntutnya, warga suku Lamatokan mendatangi lokasi dan mengecek tanaman yang ditanam Suku Kwaelaga.\nSaat itu, beberapa warga suku Kwaelaga mendatangi lokasi tersebut sehingga terjadi perdebatan terkait status lokasi tersebut dan berujung saling serang menggunakan senjata tajam hingga jatuhnya korban jiwa.\nInformasi lain yang dihimpun, kalau lokasi sengketa bertempat di Wulewata pantai Bani, Desa Baubage selama ini diklaim oleh suku Kwaelaga sebagai miliknya. Sedangkan di dalam lokasi yang disengketakan selama ini telah digarap oleh empat suku yaitu Suku Lamatokan, Suku Making, Suku Lewokeda dan Suku Wuwur.\nWarga kesal karena Suku Kwaelaga selalu menebang tanaman yang ada di lokasi milik empat suku tersebut dengan alasan lokasi tersebut adalah milik mereka. Empat suku yang ada dilokasi tidak merespon dan mengupayakan jalan damai dengan melaporkan apa yang dilakukan suku Kwaelaga kepada pemerintah Kecamatan dan Polsek Adonara.\nKapolres Flores Timur, AKBP Deny Abrahams yang dkonfirmasi, Kamis (4/3/2020) membenarkan kejadian ini.\nIa mengerahkan anggota Polres Flores Timur mem-back up anggota Polsek Witihama ditambah bantuan keamanan dari aparat TNI.\nHingga saat ini, aparat keamanan masih berjaga di sekitar lokasi kejadian dan mengimbau masyarakat tidak melakukan aksi balasan. Sementara Kapolres Flores Timur, AKBP Deny Abrahams juga masih berada di lokasi kejadian.',
        author: 'hilman'
      }
      request(app)
        .post("/articles")
        .send(body)
        .end(function(err, res){
            if(err){
                done(err)
            } else {
                expect(res.statusCode).toEqual(200);
                expect(typeof res.body).toEqual("object");
                expect(res.body).toHaveProperty('message');
                done()
            }
        })
    })
  })
  describe("failed", function(){
    it("status code 400 input is required", function(done){
      const body = {
          title: '',
          body: '',
          author: ''
      }
      request(app)
        .post("/articles")
        .send(body)
        .end(function(err, res){
            if(err){
                done(err)
            } else {
                expect(res.statusCode).toEqual(400);
                expect(typeof res.body).toEqual("object");
                expect(res.body).toHaveProperty("errors");
                expect(Array.isArray(res.body.errors)).toEqual(true);
                expect(res.body.errors).toEqual(
                  expect.arrayContaining(["author is required", "title is required", "body is required"])
                )
                done();
            }
        })
    })
  })
})

describe("testing GET /articles", function(){
  describe('GET /articles success', () => {
    it('status code 200', (done) => {
      request(app)
      .get('/articles?author=hilman')
      .end((err, res) => {
        if(err) {
          done(err)
        } else {
          expect(res.statusCode).toEqual(200);
          expect(typeof res.body).toEqual('object');
          expect(Array.isArray(res.body)).toEqual(true);

          done()
        }
      })
    })
  })

  describe('GET /articles failed', () => {
    it('status code 500', (done) => {
      request(app)
      .get('/articles?author=kumparan')
      .end((err, res) => {
        if(err) {
          done(err)
        } else {
          expect(res.statusCode).toEqual(500);
          expect(typeof res.body).toEqual('object');
          expect(res.body).toHaveProperty('message', 'Keyword Not Found');

          done()
        }
      })
    })
  })
})