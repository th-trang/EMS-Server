const pool = require('./database')

function insertFloatValue(floatArray) {
  pool.pool.getConnection((err, connection) => {
    if (err) {
      console.error('Lỗi khi lấy kết nối từ pool: ' + err.stack);
      return;
    }

    // Vòng lặp để chèn giá trị từ mảng vào bảng "data"
    for (let i = 0; i < floatArray.length; i++) {
      const floatValue = floatArray[i];
      let tag = '';

      // Kiểm tra giá trị của i
      const tagLookup = {
        0: '1HNE10CQ207',
        1: '1HNE10CQ205',
        2: '1HNE10CQ204',
        3: '1HNE10CQ203',
        4: '1HNE10CQ202',
        5: '1HNE10CQ201',
        12: '1HNECQ206',
        13: '1HNECF201',
        14: '1HNECP201',
        15: '1HNECQ002',
        16: 'T-TT0301',
        17: 'T-TT0302'
      };

      if ((i >= 0 && i <= 5) || (i >= 12 && i <= 17)) {
        tag = tagLookup[i];

        // Query
        connection.query(`UPDATE cems.data SET realtimeValue = ? WHERE tag = ?`, [floatValue, tag], (error, results, fields) => {
          if (error) {
            console.error('Lỗi khi cập nhật dữ liệu: ' + error.message);
            return;
          }
        });
      }
    }
    connection.release(); // Trả kết nối về pool
  });
}
module.exports = {
  insertFloatValue: insertFloatValue,
}