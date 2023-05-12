# 學習儲存式 XSS

此專案目的是透過架設具安全性威脅的網頁應用程式來學習儲存式 XSS 攻擊。

## 安裝教學資源
1. 確定電腦安裝好 Docker 環境。
2. 執行以下指令產生映像檔 

    ```bash
    $ docker build -t stored-xss .
    ```
3. 執行以下指令產生容器

    ```bash
    $ docker run -d --name victim -p 3000:3000 stored-xss
    ```

## 測試
1. 網頁應用程式說明

- 設定訊息

    **方法**: GET

    **端點**: http://127.0.0.1:3000/set

    **參數**: message

    將 ```$messsage``` 儲存到 redis 中    

- 取得訊息

    **方法**: GET

    **端點**: http://127.0.0.1:3000/get

    將 ```$message``` 從 redis 中取出並在網頁上顯示

    ```
    Hello, $message
    ```

2. 開啟瀏覽器並輸入以下網址

    ```
    http://127.0.0.1:3000/set?message=World
    ```
    會在網頁上看到

    ```
    MESSAGE: World HAS BEEN RECORDED!
    ```

    再次輸入以下網址

    ```
    http://127.0.0.1:3000/get
    ```
    會在網頁上看到

    ```
    Hello, World
    ```

## 攻擊

根據儲存式 XSS 的原理，攻擊者可以將惡意指令碼(script)儲存到各式資料庫中。

因為惡意指令碼已被儲存在伺服器資料庫中，因此當受害者點擊網頁應用程式的連結時惡意指令碼會持續被執行。

1. 攻擊者透過下列連結將惡意指令碼儲存到資料庫中

    ```
    http://127.0.0.1:3000/set?message=<script>alert('儲存式XSS攻擊')</script>
    ```

2. 受害者透過下列連結持續執行惡意指令碼

    ```
    http://127.0.0.1:3000/get
    ```
    
3. 練習將以下指令碼儲存到資料庫中
    
    ```javascript
    document.location.replace('http://127.0.0.1:3000/fish.html')
    ```

## 移除教學資源

執行以下指令停止並刪除相關資源

```bash
$ docker stop victim
$ docker rm victim
$ docker rmi stored-xss
```

## 如何防範儲存式 XSS 攻擊

### 使用者

1. 使用具有高安全性的瀏覽器

### 開發者

1. 檢查使用者輸入，排除非預期內容。
2. 使用弱點掃描軟體檢查網頁應用程式是否包含 XSS 漏洞。 