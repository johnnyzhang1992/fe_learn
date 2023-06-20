# mac 命令行

## ssh 新增

```bash
# 进入某个目录
cd ~/.ssh
# ssh 相关
# 修改 config 文件，新增 hostname 配置等
```

## 修改 hosts 文件

```bash
# 进入 hosts文件所在目录
cd /private/etc
# 编辑文件
sudo vim hosts
# 退出并保存内容
esc
wq # 保存修改
q! #退出不保存

```

## 来查看域名的解析全过程

例子：查看域名`startimg.cn` 的解析过程：dig +trac starimg.cn `

````bash


```bash
johnnyzhangdeMacBook-Pro:etc johnnyzhang$ dig +trac starimg.cn
; <<>> DiG 9.10.6 <<>> +trac starimg.cn
;; global options: +cmd
.   655 IN NS m.root-servers.net.
.   655 IN NS b.root-servers.net.
.   655 IN NS h.root-servers.net.
.   655 IN NS c.root-servers.net.
.   655 IN NS d.root-servers.net.
.   655 IN NS j.root-servers.net.
.   655 IN NS k.root-servers.net.
.   655 IN NS f.root-servers.net.
.   655 IN NS l.root-servers.net.
.   655 IN NS a.root-servers.net.
.   655 IN NS g.root-servers.net.
.   655 IN NS e.root-servers.net.
.   655 IN NS i.root-servers.net.
.   3600 IN RRSIG NS 8 0 518400 20190504050000 20190421040000 25266 . kr+NiPIXWR+CrEMvCJmVOlymjU5v7ExV1o45KIn6xOzQdXCNmqIpVWcE OEKVpGo5z99/uwZ7L9zC3s1mpXxbABBesra3GxMjiJ7I9u/J1FxL/LYy i+9itL7LPtKhDtXOSliJ1vwz/rCATn0GBUa10cD/1B578D8tH69BxVX9 35SA/SCNNBSCE/SFW99vilKiU77CPAcxOO1HbmYbtH9gVVrcli1jwucu 84oTFNFVIeC77fol5mzb7a3s+EdT6THPPdNblRK4OxPDJ8rciUco58E5 uIE4fBF1ryiMIrhjnk9xHwH0LRcL8h9N3NaecYBEGKpEcgPB31M6IPJo fQ12EA==
;; Received 525 bytes from 192.168.1.1#53(192.168.1.1) in 40 ms

cn.   172800 IN NS a.dns.cn.
cn.   172800 IN NS b.dns.cn.
cn.   172800 IN NS c.dns.cn.
cn.   172800 IN NS d.dns.cn.
cn.   172800 IN NS e.dns.cn.
cn.   172800 IN NS f.dns.cn.
cn.   172800 IN NS g.dns.cn.
cn.   172800 IN NS ns.cernet.net.
cn.   86400 IN DS 57724 8 2 5D0423633EB24A499BE78AA22D1C0C9BA36218FF49FD95A4CDF1A4AD 97C67044
cn.   86400 IN RRSIG DS 8 1 86400 20190504050000 20190421040000 25266 . d3pIlKbjG0mtPsL8P1UlJPPTx6qtyouJbnY94MqjmXckegZO+lYo4zq6 0bqZ48kCZvmVjQeALiRhEN7ieeS14rEV4a3o+6MUXqcUXMN71cKIuesa vN4osJy2hQvH0LvJVOEHUK0ntJGLvHzQJNiijy8v6MyWvSHwd7682Gdy O83Ras0Ke7Wi5A/zgcFZt2lg7zEXEiof2zn/y5hPEqeLbSXpCBdHE3Mj sFQRtfvKVdZkq743zWorkmYXhL+f3TmP/mkWbX+AL8T834GJdF/cFZm6 Ah4TEGbP0DsZsvgMzEQLNxbjyliEplZSk7K/T8IU70/bkKa4XHScty2B 4aTXdQ==
;; Received 701 bytes from 2001:500:a8::e#53(e.root-servers.net) in 81 ms

starimg.cn.  86400 IN NS f1g1ns1.dnspod.net.
starimg.cn.  86400 IN NS f1g1ns2.dnspod.net.
3QDAQA092EE5BELP64A74EBNB8J53D7E.cn. 21600 IN NSEC3 1 1 10 AEF123AB 3QLMP0QRNQ96G5AFGOPNB7U7IJ4MBP4B  NS SOA RRSIG DNSKEY NSEC3PARAM
3QDAQA092EE5BELP64A74EBNB8J53D7E.cn. 21600 IN RRSIG NSEC3 8 2 21600 20190515195452 20190415192259 31725 cn. q7KTq++lryMndugKWjnCrtbKvx3984P8Uo1e8of8iCNP5v8FLjTe+afE 75ZFfDmkH6XVw9clBETGpWZUuewgSIpVEmZXyIC3j9zf0RSFvq8hJcmC vjgWume2UnUme85LhSFm+rLtl1Waf3lgBHHf+BxnWsoqtpcolJp286QN bI0=
PL634LP35QS113J3JBAN47L0C8UCNIRJ.cn. 21600 IN NSEC3 1 1 10 AEF123AB PLB6EQPG91LOM6SJUSRFPQBME83DESTD  CNAME RRSIG
PL634LP35QS113J3JBAN47L0C8UCNIRJ.cn. 21600 IN RRSIG NSEC3 8 2 21600 20190512070518 20190412060518 31725 cn. Wxk/Kl/Y58l6LYuVs+m5r7B0Ea8gsmfAX2nuVX6Gjc2lIJq+rQ2YoTy6 KHmDkhTD08mnXbCUgBMyeJIFaJ/9cpct4KMBxgHiz4vbjrmiK96Rfk4c hf09lFkAooy8RHyrAIuvIfh8viFy3PK2PWd8wYV5u9ZQAjyc9Tul/AHj yGA=
;; Received 584 bytes from 203.119.26.1#53(b.dns.cn) in 38 ms

starimg.cn.  600 IN A 119.29.189.16
starimg.cn.  86400 IN NS f1g1ns1.dnspod.net.
starimg.cn.  86400 IN NS f1g1ns2.dnspod.net.
;; Received 119 bytes from 111.161.57.81#53(f1g1ns2.dnspod.net) in 32 ms
```

````
