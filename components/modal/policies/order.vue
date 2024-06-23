<template>
  <div
    class="fixed top-0 left-0 w-screen h-screen bg-black/5 backdrop-blur-lg flex items-center justify-center z-30"
    @click="$emit('close')"
  >
    <div class="container mx-auto flex items-center justify-center">
      <div
        class="w-full grid grid-cols-2 border border-gray-100 bg-white rounded-xl"
      >
        <div
          class="border-r border-gray-100 p-5 privacy-content max-h-[600px] overflow-y-auto scrollbar text-sm font-light flex flex-col gap-3"
        >
          <h1 class="text-lg">Mesafeli Satış Sözleşmesi</h1>
          <h2>1. TARAFLAR</h2>
          <p>
            İşbu Sözleşme aşağıdaki taraflar arasında aşağıda belirtilen hüküm
            ve şartlar çerçevesinde imzalanmıştır.
          </p>
          <div>
            <p>
              ‘ALICI’ ; (sözleşmede bundan sonra "ALICI" olarak anılacaktır)
            </p>
            <p>AD-SOYAD: {{ address.firstname }} {{ address.lastname }}</p>
            <p>ADRES: {{ address.address }}</p>
          </div>
          <div>
            <p>
              ‘SATICI’ (sözleşmede bundan sonra "SATICI" sıfatı ile
              .............olarak anılacaktır)
            </p>
            <p>ŞİRKET UNVANI:</p>
            <p>ADRES:</p>
            <p>MERSİS ADRESİ:</p>
            <p>VERGİ NUMARASI:</p>
          </div>
          <p>
            Alıcı işbu sözleşmeyi kabul etmekle, sözleşme konusu siparişi
            onayladığı takdirde sipariş konusu karşılığı bedeli ve varsa kargo
            ücreti, vergi gibi belirtilen ek ücretleri ödeme yükümlülüğü altına
            gireceğini ve bu konuda aydınlatıldığını ve de bilgilendirildiğini
            önceden kabul eder.
          </p>

          <h2>2. TANIMLAR</h2>
          <p>
            İşbu mesafeli satış sözleşmenin uygulanması aynı zamanda
            yorumlanmasında aşağıda yazılı terimler karşılarındaki yazılı
            açıklamaları ifade edeceklerdir.
          </p>
          <ul>
            <li>
              <strong>Dijital içerik:</strong> Bilgisayar programı, uygulama,
              oyun, müzik, video ve metin gibi dijital şekilde sunulan her türlü
              veriyi,
            </li>
            <li>
              <strong>Hizmet:</strong> Bir ücret veya menfaat karşılığında
              yapılan ya da yapılması taahhüt edilen mal sağlama dışındaki her
              türlü tüketici işleminin konusunu,
            </li>
            <li>
              <strong>Kalıcı veri saklayıcısı:</strong> Tüketicinin gönderdiği
              veya kendisine gönderilen bilgiyi, bu bilginin amacına uygun
              olarak makul bir süre incelemesine elverecek şekilde
              kaydedilmesini ve değiştirilmeden kopyalanmasını sağlayan ve bu
              bilgiye aynen ulaşılmasına imkan veren kısa mesaj, elektronik
              posta, internet, disk, CD, DVD, hafıza kartı ve benzeri her türlü
              araç veya ortamı,
            </li>
            <li>
              <strong>Kanun:</strong> 6502 sayılı Tüketicinin Korunması Hakkında
              Kanunu,
            </li>
            <li>
              <strong>Mal:</strong> Alışverişe konu olan; taşınır eşya, konut
              veya tatil amaçlı taşınmaz mallar ile elektronik ortamda
              kullanılmak üzere hazırlanan yazılım, ses, görüntü ve benzeri her
              türlü gayri maddi malları,
            </li>
            <li>
              <strong>Mesafeli sözleşme:</strong> Satıcı veya sağlayıcı ile
              tüketicinin eş zamanlı fiziksel varlığı olmaksızın, mal veya
              hizmetlerin uzaktan pazarlanmasına yönelik olarak oluşturulmuş bir
              sistem çerçevesinde, taraflar arasında sözleşmenin kurulduğu ana
              kadar ve kurulduğu an da dahil olmak üzere uzaktan iletişim
              araçlarının kullanılması suretiyle kurulan sözleşmeleri,
            </li>
            <li>
              <strong>Sağlayıcı:</strong> Kamu tüzel kişileri de dahil olmak
              üzere ticari veya mesleki amaçlarla tüketiciye hizmet sunan ya da
              hizmet sunanın adına ya da hesabına hareket eden gerçek veya tüzel
              kişiyi,
            </li>
            <li>
              <strong>Satıcı:</strong> Kamu tüzel kişileri de dahil olmak üzere
              ticari veya mesleki amaçlarla tüketiciye mal sunan ya da mal
              sunanın adına ya da hesabına hareket eden gerçek veya tüzel
              kişiyi,
            </li>
            <li>
              <strong>Tüketici:</strong> Ticari veya mesleki olmayan amaçlarla
              hareket eden gerçek veya tüzel kişiyi,
            </li>
            <li>
              <strong>Uzaktan iletişim aracı:</strong> Mektup, katalog, telefon,
              faks, radyo, televizyon, elektronik posta mesajı, kısa mesaj,
              internet gibi fiziksel olarak karşı karşıya gelinmeksizin sözleşme
              kurulmasına imkan veren her türlü araç veya ortamı,
            </li>
            <li>
              <strong>Yan sözleşme:</strong> Bir mesafeli sözleşme ile ilişkili
              olarak satıcı, sağlayıcı aracı hizmet sağlayıcı ya da üçüncü bir
              kişi tarafından sözleşme konusu mal ya da hizmete ilave olarak
              tüketiciye sağlanan mal veya hizmete ilişkin sözleşmeyi,
            </li>
            <li>
              <strong>Aracı hizmet sağlayıcı:</strong> Oluşturduğu sistem ile
              uzaktan iletişim araçlarını kullanmak veya kullandırmak suretiyle
              satıcı veya sağlayıcı adına mesafeli sözleşme kurulmasına aracılık
              eden gerçek veya tüzel kişiyi,
            </li>
            <li>
              <strong>Platform:</strong> Kamu hizmetlerinin tek noktadan
              sunulduğu ortak kamu elektronik platformu hariç olmak üzere, aracı
              hizmet sağlayıcının mesafeli sözleşme kurulmasına aracılık etmek
              üzere oluşturduğu sistemi,
            </li>
          </ul>

          <h2>3. KONU</h2>
          <p>
            İşbu Sözleşme, ALICI’nın, SATICI’ya ait internet sitesi üzerinden
            elektronik ortamda siparişini verdiği aşağıda nitelikleri ve satış
            fiyatı belirtilen ürünün satışı, teslimi, iade süreci ve cayma hakkı
            ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun
            ve Mesafeli Sözleşmelere Dair Yönetmelik hükümleri gereğince
            tarafların sahip oldukları hak ve yükümlülüklerini düzenler.
          </p>
          <p>
            Satıcı tarafından listelenen ve sitede ilan edilen fiyatlar satış
            fiyatıdır. İlan edilen fiyatlar ve indirim/kupon/kampanyalar
            güncelleme yapılana ve revize edilinceye kadar geçerlidir. Süreli
            olarak ilan edilen ürünlere ait fiyatlar ise belirtilen
            indirim/kupon/kampanyaların süresi sonuna kadar geçerlidir.
          </p>
          <p>
            Taraflar bu sözleşmeye taraf olmayan sağlayıcı ile aracı hizmet
            sağlayıcı kişilere herhangi bir hukuki veya cezai sorumluluk
            yüklenmeyeceğini kabul ve taahhüt eder. Zira işbu sözleşme sadece
            satıcı ve alıcı arasında olup, sorumluluk kanuni ve iradi olarak bu
            taraflar arasında düzenlenmiş ve kabul edilmiştir. aksi durumda
            aracı-pazarlayıcı, sağlayıcı ile aracı hizmet sağlayıcı kurumların
            ilgililere rücu hakkı saklıdır.
          </p>

          <h2>4. SATICI BİLGİLERİ</h2>
          <p>
            <strong>Unvanı:</strong><br />
            <strong>Adres:</strong><br />
            <strong>GSM:</strong><br />
            <strong>Faks:</strong><br />
            <strong>Eposta:</strong>
          </p>

          <h2>5. ALICI BİLGİLERİ</h2>
          <p>
            <strong>Teslim edilecek kişi (Ad/Soyad/Unvan):</strong><br />
            <strong>Teslimat Adresi:</strong><br />
            <strong>GSM:</strong><br />
            <strong>Faks:</strong><br />
            <strong>Eposta/kullanıcı adı:</strong>
          </p>

          <h2>6. SİPARİŞ VEREN KİŞİ BİLGİLERİ</h2>
          <p>
            <strong>Sipariş Veren Kişi (Ad/Soyad/Unvan):</strong><br />
            <strong>Adres:</strong><br />
            <strong>GSM:</strong><br />
            <strong>Faks:</strong><br />
            <strong>Eposta/kullanıcı adı:</strong>
          </p>

          <h2>7. SÖZLEŞME KONUSU ÜRÜN/ÜRÜNLER BİLGİLERİ</h2>
          <p>
            Mal /Ürün/ Hizmetin temel özelliklerini (türü/cinsi, miktarı/nevi,
            marka, modeli, rengi, adedi, muhteviyatı) SATICI’ya ait internet
            sitesinde veya sağlayıcı ile aracı hizmet sağlayıcının sitesinde
            satıcının kontrolünde yayınlanmaktadır. Satıcı tarafından kampanya
            düzenlenmiş ise ilgili ürünün temel özelliklerini kampanya süresince
            inceleyebilirsiniz. şartlar kampanya tarihine kadar geçerlidir.
          </p>
          <p>
            Listelenen ve sitede ilan edilen fiyatlar satış fiyatıdır. İlan
            edilen fiyatlar ve vaatler güncelleme yapılana ve değiştirilene
            kadar geçerlidir. Süreli olarak ilan edilen fiyatlar ise belirtilen
            süre sonuna kadar geçerlidir.
          </p>
          <p>
            Sözleşme konusu mal ya da hizmetin tüm vergiler dâhil satış fiyatı
            aşağıda gösterilmiştir.
          </p>
          <ul>
            <li>Ürün Açıklaması</li>
            <li>Adet</li>
            <li>Birim Fiyatı</li>
            <li>Ara Toplam TL (KDV Dahil)</li>
          </ul>
          <p>
            <strong>Kargo Tutarı:</strong><br />
            <strong>Kargo Tutarını Ödeyen Taraf:</strong><br />
            <strong>Toplam:</strong>
          </p>
          <p>
            <strong>Ödeme Şekli ve Planı:</strong><br />
            <strong>Teslimat Adresi:</strong><br />
            <strong>Teslim Edilecek kişi:</strong><br />
            <strong>Fatura Adresi:</strong><br />
            <strong>Sipariş Tarihi:</strong><br />
            <strong>Teslimat tarihi:</strong><br />
            <strong>Teslim şekli:</strong>
          </p>
          <p>
            Ürün sevkiyat masrafı olan kargo ücreti ALICI tarafından
            ödenecektir.
          </p>

          <h2>8. FATURA BİLGİLERİ</h2>
          <p>
            <strong>Ad-Soyad/Unvan:</strong><br />
            <strong>Adres:</strong><br />
            <strong>GSM:</strong><br />
            <strong>Faks:</strong><br />
            <strong>Eposta:</strong>
          </p>
          <p>
            <strong>Fatura teslim:</strong> Fatura sipariş teslimatı sırasında
            fatura adresine sipariş ile birlikte teslim edilecektir.
          </p>

          <h2>9. GENEL HÜKÜMLER</h2>
          <p><strong>Ön bilgilendirme:</strong></p>
          <p>
            Tüketici, mesafeli sözleşmenin kurulmasından ya da buna karşılık
            gelen herhangi bir teklifi kabul etmeden önce, aşağıdaki hususların
            tamamını içerecek şekilde satıcı veya sağlayıcı tarafından
            bilgilendirilmek zorundadır.
          </p>
          <ul>
            <li>Sözleşme konusu mal veya hizmetin temel nitelikleri,</li>
            <li>
              Satıcı veya sağlayıcı ile aracı hizmet sağlayıcının adı veya
              unvanı, MERSİS numarası veya vergi kimlik numarası,
            </li>
            <li>
              Tüketicinin satıcı veya sağlayıcı ve aracı hizmet sağlayıcı ile
              hızlı bir şekilde irtibat kurmasına imkan veren açık adres,
              telefon numarası ve benzeri iletişim bilgileri ile varsa satıcı
              veya sağlayıcının adına ya da hesabına hareket edenin kimliği ve
              adresi,
            </li>
            <li>
              Satıcı veya sağlayıcı ile aracı hizmet sağlayıcının tüketicinin
              şikayetlerini iletmesi için iletişim bilgileri,
            </li>
            <li>
              Mal veya hizmetin tüm vergiler dahil toplam fiyatı, niteliği
              itibariyle önceden hesaplanamıyorsa fiyatın hesaplanma usulü,
              varsa tüm nakliye, teslim ve benzeri ek masraflar ile bunların
              önceden hesaplanamaması halinde ek masrafların ödenebileceği
              bilgisi,
            </li>
            <li>
              Sözleşmenin kurulması aşamasında uzaktan iletişim aracının
              kullanım bedelinin olağan ücret tarifesi üzerinden hesaplanamadığı
              durumlarda, tüketicilere yüklenen ilave maliyet,
            </li>
            <li>
              Ödeme, ticari reklam ve tanıtımlarında taahhüt edilen süre ile
              uyumlu teslim veya ifa süresi, teslimat ve ifaya ilişkin diğer
              bilgiler ile varsa bunlara ilişkin taahhütler ve satıcı veya
              sağlayıcı ile aracı hizmet sağlayıcının şikayetlere ilişkin çözüm
              yöntemleri,
            </li>
            <li>
              Cayma hakkının olduğu durumlarda, bu hakkın kullanılma şartları,
              süresi, usulü, satıcının iade için öngördüğü taşıyıcıya ilişkin
              bilgi ile malın bu taşıyıcıyla iadesi halinde teslim masrafını
              geçmemek üzere iade masraf tutarına ve hangi tarafça
              karşılanacağına, öngörülenin dışında bir taşıyıcıyla iadesi
              halinde ise iade masrafını tüketicinin karşılayacağına ilişkin
              bilgiler,
            </li>
            <li>
              Cayma bildiriminin yapılacağı açık adres, faks numarası veya
              elektronik posta bilgileri,
            </li>
            <li>
              15 inci madde uyarınca cayma hakkının kullanılamadığı durumlarda,
              tüketicinin cayma hakkından faydalanamayacağına ya da hangi
              koşullarda cayma hakkını kaybedeceğine ilişkin bilgi,
            </li>
            <li>
              Satıcı veya sağlayıcının talebi üzerine, varsa tüketici tarafından
              ödenmesi veya sağlanması gereken depozitolar ya da diğer mali
              teminatlar ve bunlara ilişkin şartlar,
            </li>
            <li>
              Varsa dijital içeriklerin işlevselliğini etkileyebilecek teknik
              koruma önlemleri,
            </li>
            <li>
              Satıcı veya sağlayıcının bildiği ya da makul olarak bilmesinin
              beklendiği, dijital içeriğin hangi donanım ya da yazılımla
              birlikte çalışabileceğine ilişkin bilgi,
            </li>
            <li>
              Tüketicilerin uyuşmazlık konusundaki başvurularını Tüketici
              Mahkemesine veya Tüketici Hakem Heyetine yapabileceklerine dair
              bilgi.
            </li>
          </ul>
          <p>
            Birinci fıkrada belirtilen bilgiler, mesafeli sözleşmenin ayrılmaz
            bir parçasıdır ve taraflar aksini açıkça kararlaştırmadıkça bu
            bilgiler değiştirilemez.
          </p>
          <p>
            Satıcı veya sağlayıcı, birinci fıkranın (d) bendinde yer alan ek
            masraflara ilişkin bilgilendirme yükümlülüğünü yerine getirmezse,
            tüketici bunları karşılamakla yükümlü değildir.
          </p>
          <p>
            Birinci fıkranın (d) bendinde yer alan toplam fiyatın, belirsiz
            süreli sözleşmelerde veya belirli süreli abonelik sözleşmelerinde,
            her faturalama dönemi bazında toplam masrafları içermesi zorunludur.
          </p>
          <p>
            Açık artırma veya eksiltme yoluyla kurulan sözleşmelerde, birinci
            fıkranın (b), (c) ve (ç) bentlerinde yer alan bilgilerin yerine açık
            artırmayı yapan ile ilgili bilgilere yer verilebilir.
          </p>
          <p>
            Ön bilgilendirme yapıldığına ilişkin ispat yükü satıcı veya
            sağlayıcı ile aracı hizmet sağlayıcıya aittir.
          </p>
          <p>
            Mesafeli sözleşmenin platform üzerinden kurulması halinde aracı
            hizmet sağlayıcı ön bilgilendirmenin yapılmasından satıcı veya
            sağlayıcı ile birlikte müteselsilen sorumludur. Veri girişinin aracı
            hizmet sağlayıcı tarafından yapıldığı durumlarda, birinci fıkrada
            belirlenen zorunlu hususlardaki eksikliklerden ve verilerin
            doğruluğundan aracı hizmet sağlayıcı sorumludur.
          </p>
          <p>
            ALICI, SATICI’ya ait internet sitesinde sözleşme konusu ürünün temel
            nitelikleri, satış fiyatı ve ödeme şekli ile teslimata ilişkin ön
            bilgileri okuyup, bilgi sahibi olduğunu, elektronik ortamda gerekli
            teyidi verdiğini kabul, beyan ve taahhüt eder. ALICI’nın; Ön
            Bilgilendirmeyi elektronik ortamda teyit etmesi, mesafeli satış
            sözleşmesinin kurulmasından evvel, SATICI tarafından ALICI' ya
            verilmesi gereken adresi, siparişi verilen ürünlere ait temel
            özellikleri, ürünlerin vergiler dâhil fiyatını, ödeme ve teslimat
            bilgilerini de doğru ve eksiksiz olarak edindiğini kabul, beyan ve
            taahhüt eder.
          </p>
          <p>
            Sözleşme konusu her bir ürün, 30 günlük yasal süreyi aşmamak kaydı
            ile ALICI' nın yerleşim yeri uzaklığına bağlı olarak internet
            sitesindeki ön bilgiler kısmında belirtilen süre zarfında ALICI veya
            ALICI’nın gösterdiği adresteki kişi ve/veya kuruluşa teslim edilir.
            Bu süre içinde ürünün ALICI’ya teslim edilememesi durumunda,
            ALICI’nın sözleşmeyi feshetme hakkı saklıdır.
          </p>
          <p>
            SATICI, Sözleşme konusu ürünü eksiksiz, siparişte belirtilen
            niteliklere uygun ve varsa garanti belgeleri, kullanım kılavuzları
            işin gereği olan bilgi ve belgeler ile teslim etmeyi, her türlü
            ayıptan arî olarak yasal mevzuat gereklerine göre sağlam,
            standartlara uygun bir şekilde işi doğruluk ve dürüstlük esasları
            dâhilinde ifa etmeyi, hizmet kalitesini koruyup yükseltmeyi, işin
            ifası sırasında gerekli dikkat ve özeni göstermeyi, ihtiyat ve
            öngörü ile hareket etmeyi kabul, beyan ve taahhüt eder.
          </p>
          <p>
            SATICI, sözleşmeden doğan ifa yükümlülüğünün süresi dolmadan
            ALICI’yı bilgilendirmek ve açıkça onayını almak suretiyle eşit
            kalite ve fiyatta farklı bir ürün tedarik edebilir.
          </p>
          <p>
            SATICI, sipariş konusu ürün veya hizmetin yerine getirilmesinin
            imkânsızlaşması halinde sözleşme konusu yükümlülüklerini yerine
            getiremezse, bu durumu, öğrendiği tarihten itibaren 3 gün içinde
            yazılı olarak tüketiciye bildireceğini, 14 günlük süre içinde toplam
            bedeli ALICI’ya iade edeceğini kabul, beyan ve taahhüt eder.
          </p>
          <p>
            ALICI, Sözleşme konusu ürünün teslimatı için işbu Sözleşme’yi
            elektronik ortamda teyit edeceğini, herhangi bir nedenle sözleşme
            konusu ürün bedelinin ödenmemesi ve/veya banka kayıtlarında iptal
            edilmesi halinde, SATICI’nın sözleşme konusu ürünü teslim
            yükümlülüğünün sona ereceğini kabul, beyan ve taahhüt eder.
          </p>
          <p>
            ALICI, müşteri panelinde bulunan ürün formu kısmını
            ürün/ürünler/hizmeti en kısa sürede değerlendirmekle sorumlu olup
            iletişim bilgilerinde verilen telefon numarasına SMS olarak
            gönderilen 6 hanelik kodu onaylaması gerekmektedir.
          </p>
          <p>
            ALICI, Sözleşme konusu ürünün ALICI veya ALICI’nın gösterdiği
            adresteki kişi ve/veya kuruluşa tesliminden sonra ALICI'ya ait kredi
            kartının yetkisiz kişilerce haksız kullanılması sonucunda sözleşme
            konusu ürün bedelinin ilgili banka veya finans kuruluşu tarafından
            SATICI'ya ödenmemesi halinde, ALICI Sözleşme konusu ürünü 3 gün
            içerisinde nakliye gideri SATICI’ya ait olacak şekilde SATICI’ya
            iade edeceğini kabul, beyan ve taahhüt eder.
          </p>
          <p>
            SATICI, tarafların iradesi dışında gelişen, önceden öngörülemeyen ve
            tarafların borçlarını yerine getirmesini engelleyici ve/veya
            geciktirici hallerin oluşması gibi mücbir sebepler halleri nedeni
            ile sözleşme konusu ürünü süresi içinde teslim edemez ise, durumu
            ALICI'ya bildireceğini kabul, beyan ve taahhüt eder. ALICI da
            siparişin iptal edilmesini, sözleşme konusu ürünün varsa emsali ile
            değiştirilmesini ve/veya teslimat süresinin engelleyici durumun
            ortadan kalkmasına kadar ertelenmesini SATICI’dan talep etme hakkını
            haizdir. ALICI tarafından siparişin iptal edilmesi halinde ALICI’nın
            nakit ile yaptığı ödemelerde, ürün tutarı 14 gün içinde kendisine
            nakden ve defaten ödenir. ALICI’nın kredi kartı ile yaptığı
            ödemelerde ise, ürün tutarı, siparişin ALICI tarafından iptal
            edilmesinden sonra 14 gün içerisinde ilgili bankaya iade edilir.
            ALICI, SATICI tarafından banka veya kredi kartına iade edilen
            tutarın banka tarafından ALICI hesabına yansıtılmasına ilişkin
            ortalama sürecin 1 ayı bulabileceğini, bu tutarın bankaya iadesinden
            sonra ALICI’nın hesaplarına yansıması halinin tamamen banka işlem
            süreci ile ilgili olduğundan, ALICI, olası gecikmeler için SATICI’yı
            sorumlu tutamayacağını kabul, beyan ve taahhüt eder.
          </p>
          <p>
            SATICI, ALICI tarafından siteye kayıt formunda belirtilen veya daha
            sonra kendisi tarafından güncellenen adresi, e-posta adresi, sabit
            ve mobil telefon hatları ve diğer iletişim bilgileri üzerinden
            mektup, e-posta, SMS, telefon görüşmesi ve diğer yollarla iletişim,
            pazarlama, bildirim ve diğer amaçlarla ALICI’ya ulaşma hakkı
            bulunmaktadır. ALICI, işbu sözleşmeyi kabul etmekle SATICI’nın
            kendisine yönelik yukarıda belirtilen iletişim yollarını
            kullanabileceğini kabul ve beyan etmektedir.
          </p>
          <p>
            ALICI, sözleşme konusu mal/hizmeti teslim almadan önce muayene
            edecektir. Ezik, kırık, ambalajı yırtılmış vb. hasarlı ve ayıplı
            mal/hizmeti kargo şirketinden teslim almaması gereklidir. Teslim
            alınan mal/hizmetin hasarsız ve sağlam olduğu ve bu şekilde teslim
            alındığı kabul edilecektir. Teslimden sonra mal/hizmetin özenle
            korunması borcu, ALICI’ya aittir. Cayma hakkı kullanılacaksa
            mal/hizmetin kullanılmaması, kutu ve ambalajının sağlam olması
            gereklidir. Faturanın da aynı şekilde ambalaj içinde iade edilmesi
            gereklidir.
          </p>
          <p>
            ALICI ile sipariş esnasında kullanılan kredi kartı hamilinin aynı
            kişi olmaması veya ürünün ALICI’ya tesliminden evvel, siparişte
            kullanılan kredi kartına ilişkin güvenlik açığı tespit edilmesi
            halinde, SATICI, kredi kartı hamiline ilişkin kimlik ve iletişim
            bilgilerini, siparişte kullanılan kredi kartının bir önceki aya ait
            ekstresini yahut kart hamilinin bankasından kredi kartının kendisine
            ait olduğuna ilişkin yazıyı ibraz etmesini ALICI’dan talep edebilir.
            ALICI’nın talebe konu bilgi/belgeleri temin etmesine kadar geçecek
            sürede sipariş dondurulacak olup, mezkur taleplerin 24 saat
            içerisinde karşılanmaması halinde ise SATICI, siparişi iptal etme
            hakkını haizdir.
          </p>
          <p>
            ALICI, SATICI’ya ait internet sitesine üye olurken verdiği kişisel
            ve diğer sair bilgilerin gerçeğe uygun olduğunu, SATICI’nın bu
            bilgilerin gerçeğe aykırılığı nedeniyle uğrayacağı tüm zararları,
            SATICI’nın ilk bildirimi üzerine derhal, nakden ve defaten tazmin
            edeceğini beyan ve taahhüt eder.
          </p>
          <p>
            ALICI, SATICI’ya ait internet sitesini kullanırken yasal mevzuat
            hükümlerine riayet etmeyi ve bunları ihlal etmemeyi baştan kabul ve
            taahhüt eder. Aksi takdirde, doğacak tüm hukuki ve cezai
            yükümlülükler tamamen ve münhasıran ALICI’yı bağlayacaktır.
          </p>
          <p>
            ALICI, SATICI’ya ait internet sitesini hiçbir şekilde kamu düzenini
            bozucu, genel ahlaka aykırı, başkalarını rahatsız ve taciz edici
            şekilde, yasalara aykırı bir amaç için, başkalarının maddi ve manevi
            haklarına tecavüz edecek şekilde kullanamaz. Ayrıca, üye
            başkalarının hizmetleri kullanmasını önleyici veya zorlaştırıcı
            faaliyet (spam, virus, truva atı, vb.) işlemlerde bulunamaz.
          </p>
          <p>
            SATICI’ya ait internet sitesinin üzerinden, SATICI’nın kendi
            kontrolünde olmayan ve/veya başkaca üçüncü kişilerin sahip olduğu
            ve/veya işlettiği başka web sitelerine ve/veya başka içeriklere link
            verilebilir. Bu linkler ALICI’ya yönlenme kolaylığı sağlamak
            amacıyla konulmuş olup herhangi bir web sitesini veya o siteyi
            işleten kişiyi desteklememekte ve Link verilen web sitesinin
            içerdiği bilgilere yönelik herhangi bir garanti niteliği
            taşımamaktadır.
          </p>
          <p>
            İşbu sözleşme içerisinde sayılan maddelerden bir ya da birkaçını
            ihlal eden üye işbu ihlal nedeniyle cezai ve hukuki olarak şahsen
            sorumlu olup, SATICI’yı bu ihlallerin hukuki ve cezai sonuçlarından
            ari tutacaktır. Ayrıca; işbu ihlal nedeniyle, olayın hukuk alanına
            intikal ettirilmesi halinde, SATICI’nın üyeye karşı üyelik
            sözleşmesine uyulmamasından dolayı tazminat talebinde bulunma hakkı
            saklıdır.
          </p>

          <h2>10. CAYMA HAKKI</h2>
          <p>
            ALICI; mesafeli sözleşmenin mal satışına ilişkin olması durumunda,
            ürünün kendisine veya gösterdiği adresteki kişi/kuruluşa teslim
            tarihinden itibaren 14 (on dört) gün içerisinde, SATICI’ya bildirmek
            şartıyla hiçbir hukuki ve cezai sorumluluk üstlenmeksizin ve hiçbir
            gerekçe göstermeksizin malı reddederek sözleşmeden cayma hakkını
            kullanabilir. Şu halde ki söz konusu ürün veya hizmetin
            kullanılmamış olması gereklidir. Hizmet sunumuna ilişkin mesafeli
            sözleşmelerde ise, bu süre sözleşmenin imzalandığı tarihten itibaren
            başlar. Cayma hakkı süresi sona ermeden önce, tüketicinin onayı ile
            hizmetin ifasına başlanan hizmet sözleşmelerinde cayma hakkı
            kullanılamaz. Cayma hakkının kullanımından kaynaklanan masraflar
            SATICI’ya aittir. ALICI, iş bu sözleşmeyi kabul etmekle, cayma hakkı
            konusunda bilgilendirildiğini peşinen kabul eder.
          </p>
          <p>
            Cayma hakkının kullanılması için 14 (ondört) günlük süre içinde
            SATICI' ya iadeli taahhütlü posta, faks veya e-posta ile yazılı
            bildirimde bulunulması ve ürünün işbu sözleşmede düzenlenen "Cayma
            Hakkı Kullanılamayacak Ürünler" hükümleri çerçevesinde kullanılmamış
            olması şarttır. Bu hakkın kullanılması halinde,
          </p>
          <ul>
            <li>
              3. kişiye veya ALICI’ ya teslim edilen ürünün faturası, (İade
              edilmek istenen ürünün faturası kurumsal ise, iade ederken kurumun
              düzenlemiş olduğu iade faturası ile birlikte gönderilmesi
              gerekmektedir. Faturası kurumlar adına düzenlenen sipariş iadeleri
              İADE FATURASI kesilmediği takdirde tamamlanamayacaktır.)
            </li>
            <li>İade formu,</li>
            <li>
              İade edilecek ürünlerin kutusu, ambalajı, varsa standart
              aksesuarları ile birlikte eksiksiz ve hasarsız olarak teslim
              edilmesi gerekmektedir.
            </li>
            <li>
              SATICI, cayma bildiriminin kendisine ulaşmasından itibaren en geç
              10 günlük süre içerisinde toplam bedeli ve ALICI’yı borç altına
              sokan belgeleri ALICI’ ya iade etmek ve 20 günlük süre içerisinde
              malı iade almakla yükümlüdür.
            </li>
            <li>
              ALICI’ nın kusurundan kaynaklanan bir nedenle malın değerinde bir
              azalma olursa veya iade imkânsızlaşırsa ALICI kusuru oranında
              SATICI’ nın zararlarını tazmin etmekle yükümlüdür. Ancak cayma
              hakkı süresi içinde malın veya ürünün usulüne uygun kullanılması
              sebebiyle meydana gelen değişiklik ve bozulmalardan ALICI sorumlu
              değildir.
            </li>
            <li>
              Cayma hakkının kullanılması nedeniyle SATICI tarafından düzenlenen
              kampanya limit tutarının altına düşülmesi halinde kampanya
              kapsamında faydalanılan indirim miktarı iptal edilir.
            </li>
          </ul>

          <h2>11. CAYMA HAKKI KAPSAMINA GİRMEYEN ÜRÜN/ÜRÜNLER</h2>
          <p>
            ALICI’nın isteği veya açıkça kişisel ihtiyaçları doğrultusunda
            hazırlanan ve geri gönderilmeye müsait olmayan, iç giyim alt
            parçaları, mayo ve bikini altları, makyaj malzemeleri, tek
            kullanımlık ürünler, çabuk bozulma tehlikesi olan veya son kullanma
            tarihi geçme ihtimali olan mallar, ALICI’ya teslim edilmesinin
            ardından ALICI tarafından ambalajı açıldığı takdirde iade edilmesi
            sağlık ve hijyen açısından uygun olmayan ürünler, teslim edildikten
            sonra başka ürünlerle karışan ve doğası gereği ayrıştırılması mümkün
            olmayan ürünler, Abonelik sözleşmesi kapsamında sağlananlar dışında,
            gazete ve dergi gibi süreli yayınlara ilişkin mallar, Elektronik
            ortamda anında ifa edilen hizmetler veya tüketiciye anında teslim
            edilen gayrimaddi mallar,ile ses veya görüntü kayıtlarının, kitap,
            dijital içerik, yazılım programlarının, veri kaydedebilme ve veri
            depolama cihazlarının, bilgisayar sarf malzemelerinin, ambalajının
            ALICI tarafından açılmış olması halinde iadesi Yönetmelik gereği
            mümkün değildir. Ayrıca Cayma hakkı süresi sona ermeden önce,
            tüketicinin onayı ile ifasına başlanan hizmetlere ilişkin cayma
            hakkının kullanılması da Yönetmelik gereği mümkün değildir.
          </p>
          <p>
            Kozmetik ve kişisel bakım ürünleri, iç giyim ürünleri, mayo, bikini,
            kitap, kopyalanabilir yazılım ve programlar, DVD, VCD, CD ve
            kasetler ile kırtasiye sarf malzemeleri (toner, kartuş, şerit vb.)
            iade edilebilmesi için ambalajlarının açılmamış, denenmemiş,
            bozulmamış ve kullanılmamış olmaları gerekir.
          </p>

          <h2>12. TEMERRÜT HALİ/FAİZİ VE HUKUKİ SONUÇLARI</h2>
          <p>
            ALICI, ödeme işlemlerini kredi kartı ile yaptığı durumda temerrüde
            düştüğü takdirde, kart sahibi banka ile arasındaki kredi kartı
            sözleşmesi çerçevesinde faiz ödeyeceğini ve bankaya karşı sorumlu
            olacağını kabul, beyan ve taahhüt eder. Bu durumda ilgili banka
            hukuki yollara başvurabilir; doğacak masrafları ve vekâlet ücretini
            ALICI’dan talep edebilir ve her koşulda ALICI’nın borcundan dolayı
            temerrüde düşmesi halinde, ALICI, borcun gecikmeli ifasından dolayı
            SATICI’nın uğradığı zarar ve ziyanını ödeyeceğini kabul, beyan ve
            taahhüt eder.
          </p>

          <h2>13. YETKİLİ MAHKEME</h2>
          <p>
            İşbu sözleşmeden doğan uyuşmazlıklarda şikayet ve itirazlar,
            öncelikle Diyarbakır mahkeme ve hakem heyetleri yetkili ve görevli
            olmakla beraber; kanuni durumlarda aşağıdaki kanunda belirtilen
            parasal sınırlar dâhilinde tüketicinin yerleşim yerinin bulunduğu
            veya tüketici işleminin yapıldığı yerdeki tüketici sorunları hakem
            heyetine veya tüketici mahkemesine yapılacaktır. Parasal sınıra
            ilişkin bilgiler 6502 sayılı tüketicinin korunması hakkında kanunun
            68inci ve Tüketici hakem heyetleri yönetmeliğinin 6ıncı maddelerinde
            yer alan parasal sınırların arttırılmasına ilişkin tebliğ gereğince
            aşağıdadır:
          </p>
          <p>
            01/01/2024 tarihinden itibaren geçerli olmak üzere:<br />
            2024 yılı için yapılacak başvurularda değeri 104.000 (yüzdört bin)
            Türk Lirasının altında bulunan uyuşmazlıklarda, İl veya İlçe
            Tüketici Hakem Heyetleri görevlidir.
          </p>
          <p>İşbu Sözleşme ticari amaçlarla yapılmaktadır.</p>

          <h2>14. YÜRÜRLÜK</h2>
          <p>
            ALICI, Site üzerinden verdiği siparişe ait ödemeyi
            gerçekleştirdiğinde işbu sözleşmenin tüm şartlarını kabul etmiş
            sayılır. SATICI, siparişin gerçekleşmesi öncesinde işbu sözleşmenin
            sitede ALICI tarafından okunup kabul edildiğine dair onay alacak
            şekilde gerekli yazılımsal düzenlemeleri yapmakla yükümlüdür.
          </p>

          <p>
            <strong>SATICI:</strong><br />
            <strong>ALICI:</strong><br />
            <strong>TARİH:</strong>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["address"],
};
</script>
