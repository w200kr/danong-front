
코드가 분리되지 않으면 책임 분야나 개발 내용이 겹쳐 협업이 원활하지 않을 수 있기 때문에 서버와 클라이언트의 개발을 분리하기로 함.

환경, 협업, 
개발~~
기본적인 흐름
    1. 서비스의 기능마다 정해진 데이터 양식을 정한다. 
        로그인 - 사람이름, 학번 등~~

    2. 먼저 클라이언트 개발자가 페이지 혹은 기능마다 필요한 데이터 양식을 정의하고 해당 데이터 양식에 맞는 더미데이터로 페이지를 만든다.


    3. 서버 개발자는 그에 맞춰 데이터베이스에서 필요한 데이터를 가져와 프론트 앱이 바로 사용할수 있게 가공 후 api로 전달한다.



실제로 구현에 필요한 개발 스택

언어 : php, python~ 버전
프레임워크 : 이거 하나로 다할수있는
라이브러리 : 젓가락 숟가락 
프레임 > 라이브



    백앤드 (서버)
        언어 : Python 3.6
        프레임워크 : Django 3.0
        데이터베이스 : MariaDB
        앱 배포 : AWS Lightsail

    프론트앤드 (클라이언트)
        언어 : Javascript ECMAScript 8
        사용 라이브러리 : React, Material-UI
        패키지 매니저 : Yarn
        앱 배포 : AWS S3

php, java, python, ruby


위의 기술 스택을 채용한 이유.
우선 서버쪽에서는 PHP, python, ruby, nodejs(javascript) 등이 고려대상

이중 python을 선택한 이유
nodejs는 오류처리, 비동기처리 등의 작업에서 난이도가 있는 편이라 제외함
또 Python은 PHP보다 쉽게 사용할 수 있는 라이브러리들이 많고 ruby는 이용유저가 많지 않아 레퍼런스를 확인하기 어려울것이라 판단함.

python을 사용한 웹서버 프레임워크 중 Flask, Django 중에 django를 선택한 이유
위치기반 검색서비스를 개발하는 입장에서 django가 기본적으로 제공하는 기능이 탄탄하다.
로그인 등 인증 과정이나 데이터베이스 ORM과 그에 따라 자동생성되는 관리자페이지를 사용할 수 있다는게 매력있음.

클라이언트 언어 선택의 자유는 없으므로 자바스크립트로 진행.
기획서상의 위치기반 상품 검색 등등의 기능에서 같은 페이지 안에 사용자 입력에 따라 처리해야 하는 비동기 동작이 매우 많으므로 jquery의 사용이 불편해보임.
따라서 상태처리에 특화된 React를 선택. React Create App을 통해 가볍게 시작할 수 있어서 좋음.



이슈별 개발 내용

    회원 관리
        1. 가입
            카카오톡 API 연계 회원가입.
            가입시 카카오톡채널 혹은 개인 프로필 등록해 고객 상담 직접 유도.
        2. 상품 등록
            Django admin 통해서 판매상품 등록.

    농축산품 위치 기반 거래 서비스
        1. 산지, 상품 정보 등 소비사 선택에 의한 상품 필터링
            naver map API 통한 산지 위치 조회.

        2. 상품 페이지
            상품페이지 노출시 해당 농지의 토양적성도를 흙토람(농촌진흥처 API)로 조회해서 노출.

        3. 결제
            PG사 결제연동 서비스 Iamport 사용해서 실제 카드거래가 가능하도록 구성.




서버 git


개발환경 세팅에서 여러명이 같은 버전을 가져야하는데 빠른 구성을 위해 한명이 개발환경을 세팅해서 Git에 Push 후 그걸 복사해서 나머지 인원이 세팅하기로 함.






# README #

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###

* Quick summary
* Version
* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### How do I get set up? ###

* Summary of set up
* Configuration
* Dependencies
* Database configuration
* How to run tests
* Deployment instructions

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact