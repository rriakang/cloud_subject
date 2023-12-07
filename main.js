const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 8000;

// 미들웨어 설정
app.use(bodyParser.urlencoded({ extended: true }));

// 정적 파일 제공
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, 'html')));

// 가상의 사용자 데이터베이스
const users = [
  { username: 'admin', password: 'admin' },
];

// 라우트: 로그인 페이지 렌더링
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'login.html'));
});

// 로그인 요청 처리
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // 간단한 로그인 검증 (실제로는 보안을 강화해야 함)
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.redirect('/main'); // 로그인 성공 시 '/main'으로 리다이렉트
  } else {
    res.send(`
      <script>
        alert('로그인 실패하였습니다.');
        window.location.href = '/'; // 실패 시 다시 로그인 페이지로 이동
      </script>
    `);
  }
});

// '/main'으로 리다이렉트할 때 main.html 파일을 전송
app.get('/main', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'main.html'));
  });
  
app.get('/section1', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'section1.html'));
});

app.get('/section2', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'section2.html'));
});

app.get('/section3', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'section3.html'));
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
