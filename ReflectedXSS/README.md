# 學習反射式 XSS

此專案目的是透過架設具安全性威脅的網頁應用程式來學習反射式 XSS 攻擊。

## 安裝教學資源
1. 確定電腦安裝好 Docker 環境。
2. 執行以下指令產生映像檔 

    ```bash
    $ docker build -t reflected-xss .
    ```
3. 執行以下指令產生容器

    ```bash
    $ docker run -d --name victim -p 3000:3000 reflected-xss
    ```

## 測試
1. 網頁應用程式說明

    **方法**: GET

    **端點**: http://127.0.0.1:3000/hello

    **參數**: name

    **輸出**: Hello, ```$name```    

2. 開啟瀏覽器並輸入以下網址

    ```
    http://127.0.0.1:3000/hello?name=Bob
    ```
    會在網頁上看到

    ```
    Hello, Bob
    ```

## 攻擊

根據反射式 XSS 的原理，攻擊者會產生惡意指令碼(script)的連結並提供給受害者。

如果受害者無法察覺此安全性威脅並點擊該連結後，該惡意指令碼就會傳送給網頁伺服器並反射給瀏覽器執行。

1. 產生惡意連結如下

    ```
    http://127.0.0.1:3000/hello?name=<script>alert('反射式XSS攻擊')</script>
    ```

    並提供給受害者

2. 開啟瀏覽器並輸入惡意連結會執行以下指令碼

    ```javascript
    alert('反射式XSS攻擊')
    ```

    並產生對話框。(*想像這是一個惡意指令碼*)
    
3. 練習產生能執行以下指令碼的連結
    
    ```javascript
    document.location.replace('http://127.0.0.1:3000/fish.html')
    ```

    就可以將使用者導向到另一個網站。

## 移除教學資源

執行以下指令停止並刪除相關資源

```bash
$ docker stop victim
$ docker rm victim
$ docker rmi reflected-xss
```

## 如何防範反射式 XSS 攻擊

### 使用者

1. 使用具有高安全性的瀏覽器
2. 點擊連結前確認連結內容，當發現連結出現不明指令碼時請小心！

### 開發者

1. 檢查使用者輸入，排除非預期內容。
2. 使用弱點掃描軟體檢查網頁應用程式是否包含 XSS 漏洞。 