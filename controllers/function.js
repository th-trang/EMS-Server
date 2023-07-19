const pool = require('../util/database')

function insertFloatValue(floatArray) {
    pool.pool.getConnection((err, connection) => {
        if (err) {
          console.error('Lỗi khi lấy kết nối từ pool: ' + err.stack);
          return;
        }
        console.log(pool)
        // Vòng lặp để chèn giá trị từ mảng vào bảng "data"
        for (let i = 0; i < floatArray.length; i++) {
          const floatValue = floatArray[i];
          let tag = '';
    
          // Kiểm tra giá trị của i
          if ((i >= 0 && i <= 5) || (i >= 12 && i <= 17)) {
            switch (i) {
              case 0:
                tag = '1HNE10CQ207';
                break;
              case 1:
                tag = '1HNE10CQ205';
                break;
              case 2:
                tag = '1HNE10CQ204';
                break;
              case 3:
                tag = '1HNE10CQ203';
                break;
              case 4:
                tag = '1HNE10CQ202';
                break;
              case 5:
                tag = '1HNE10CQ201';
                break;
              case 12:
                tag = '1HNECQ206';
                break;
              case 13:
                tag = '1HNECF201';
                break;
              case 14:
                tag = '1HNECP201';
                break;
              case 15:
                tag = '1HNECQ002';
                break;
              case 16:
                tag = 'T-TT0301';
                break;
              case 17:
                tag = 'T-TT0302';
                break;
              default:
                break;
            }

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