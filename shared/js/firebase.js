const firebaseConfig = {
  apiKey: "AIzaSyB0J_KUp1dCAuMf6BFsFr7ZqyImSSdLmsY",
  authDomain: "typing-practice-web1141228.firebaseapp.com",
  databaseURL: "https://typing-practice-web1141228-default-rtdb.firebaseio.com",
  projectId: "typing-practice-web1141228",
  storageBucket: "typing-practice-web1141228.firebasestorage.app",
  messagingSenderId: "453403933832",
  appId: "1:453403933832:web:d59afeaab95abc3738b33d"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

async function saveScore(playerName, score, time, game) {
  try {
    await db.collection('leaderboard').add({
      playerName,
      score,
      time,
      game,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    return true;
  } catch (e) {
    console.error('儲存分數失敗:', e);
    return false;
  }
}

async function clearLeaderboard(game) {
  try {
    const snapshot = await db.collection('leaderboard').get();
    const batch = db.batch();
    snapshot.docs.forEach(doc => {
      if (doc.data().game === game) batch.delete(doc.ref);
    });
    await batch.commit();
    return true;
  } catch (e) {
    console.error('清除排行榜失敗:', e);
    return false;
  }
}

async function getLeaderboard(game, limit = 10) {
  try {
    const snapshot = await db.collection('leaderboard').get();
    const docs = snapshot.docs
      .map(doc => doc.data())
      .filter(d => d.game === game)
      .sort((a, b) => (b.score || 0) - (a.score || 0))
      .slice(0, limit);
    return docs;
  } catch (e) {
    console.error('讀取排行榜失敗:', e);
    return [];
  }
}
