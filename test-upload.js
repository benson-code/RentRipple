// 圖片上傳 API 測試腳本
const API_BASE = 'https://bangkokmrt.vercel.app';

// 創建測試用的 base64 圖片數據
function createTestImageData(size = 'small', format = 'png') {
  // 簡單的 1x1 像素圖片 base64 數據
  const formats = {
    png: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    jpg: '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
    webp: 'UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==',
    gif: 'R0lGODlhAQABAPAAAP8AAP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='
  };

  const sizeMultiplier = {
    small: 1,
    medium: 100,
    large: 1000
  };

  const baseData = formats[format] || formats.png;
  const multiplier = sizeMultiplier[size] || 1;

  // 重複數據來模擬不同大小的檔案
  const repeatedData = baseData.repeat(multiplier);

  return `data:image/${format};base64,${repeatedData}`;
}

// 測試函數
async function testUpload(testName, imageData, imageName, shouldSucceed = true) {
  console.log(`\n🧪 測試: ${testName}`);
  console.log(`📁 檔名: ${imageName}`);
  console.log(`📏 資料長度: ${imageData.length} 字元`);

  try {
    const response = await fetch(`${API_BASE}/api/upload-image`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imageData,
        imageName
      })
    });

    const result = await response.json();
    const success = response.ok;

    console.log(`📊 狀態碼: ${response.status}`);
    console.log(`📄 回應: ${JSON.stringify(result, null, 2)}`);

    if (shouldSucceed && success) {
      console.log('✅ 測試通過 - 上傳成功');
      return { success: true, result };
    } else if (!shouldSucceed && !success) {
      console.log('✅ 測試通過 - 正確拒絕');
      return { success: true, result };
    } else if (shouldSucceed && !success) {
      console.log('❌ 測試失敗 - 應該成功但失敗了');
      return { success: false, error: result.error };
    } else {
      console.log('❌ 測試失敗 - 應該失敗但成功了');
      return { success: false, error: '意外成功' };
    }

  } catch (error) {
    console.log(`💥 網路錯誤: ${error.message}`);
    if (shouldSucceed) {
      console.log('❌ 測試失敗 - 網路錯誤');
      return { success: false, error: error.message };
    } else {
      console.log('✅ 測試通過 - 正確處理錯誤');
      return { success: true, error: error.message };
    }
  }
}

// 執行所有測試
async function runAllTests() {
  console.log('🚀 開始圖片上傳 API 測試');
  console.log(`🌐 測試環境: ${API_BASE}`);
  console.log('=' .repeat(60));

  const testResults = [];

  // 測試 1: 正常 PNG 上傳
  let result = await testUpload(
    '正常 PNG 上傳',
    createTestImageData('small', 'png'),
    'test-small.png',
    true
  );
  testResults.push({ test: '正常 PNG 上傳', ...result });

  // 測試 2: 正常 JPG 上傳
  result = await testUpload(
    '正常 JPG 上傳',
    createTestImageData('small', 'jpg'),
    'test-small.jpg',
    true
  );
  testResults.push({ test: '正常 JPG 上傳', ...result });

  // 測試 3: WebP 格式
  result = await testUpload(
    'WebP 格式上傳',
    createTestImageData('small', 'webp'),
    'test-small.webp',
    true
  );
  testResults.push({ test: 'WebP 格式上傳', ...result });

  // 測試 4: GIF 格式
  result = await testUpload(
    'GIF 格式上傳',
    createTestImageData('small', 'gif'),
    'test-small.gif',
    true
  );
  testResults.push({ test: 'GIF 格式上傳', ...result });

  // 測試 5: 大檔案（應該失敗）
  result = await testUpload(
    '大檔案上傳 (>5MB)',
    createTestImageData('large', 'png'),
    'test-large.png',
    false
  );
  testResults.push({ test: '大檔案上傳', ...result });

  // 測試 6: 不支援的格式
  result = await testUpload(
    '不支援格式 (PDF)',
    'data:application/pdf;base64,JVBERi0xLjQKJdPr6eEK',
    'test-document.pdf',
    false
  );
  testResults.push({ test: '不支援格式', ...result });

  // 測試 7: 空檔案名稱
  result = await testUpload(
    '空檔案名稱',
    createTestImageData('small', 'png'),
    '',
    false
  );
  testResults.push({ test: '空檔案名稱', ...result });

  // 測試 8: 缺少圖片資料
  result = await testUpload(
    '缺少圖片資料',
    '',
    'test-empty.png',
    false
  );
  testResults.push({ test: '缺少圖片資料', ...result });

  // 測試 9: 超長檔案名稱
  result = await testUpload(
    '超長檔案名稱',
    createTestImageData('small', 'png'),
    'a'.repeat(150) + '.png',
    false
  );
  testResults.push({ test: '超長檔案名稱', ...result });

  // 測試 10: 惡意檔案名稱
  result = await testUpload(
    '惡意檔案名稱',
    createTestImageData('small', 'png'),
    '../../../etc/passwd.png',
    true  // 應該成功但檔名會被清理
  );
  testResults.push({ test: '惡意檔案名稱', ...result });

  // 顯示測試總結
  console.log('\n' + '=' .repeat(60));
  console.log('📋 測試總結');
  console.log('=' .repeat(60));

  const passed = testResults.filter(t => t.success).length;
  const total = testResults.length;

  console.log(`✅ 通過: ${passed}/${total} (${(passed/total*100).toFixed(1)}%)`);

  testResults.forEach(test => {
    const status = test.success ? '✅' : '❌';
    console.log(`${status} ${test.test}`);
    if (!test.success) {
      console.log(`   錯誤: ${test.error}`);
    }
  });

  console.log('\n🎯 測試完成!');

  return testResults;
}

// 測試 API 端點可用性
async function testAPIEndpoint() {
  console.log('\n🔍 測試 API 端點可用性...');

  try {
    // 測試 OPTIONS 請求
    const optionsResponse = await fetch(`${API_BASE}/api/upload-image`, {
      method: 'OPTIONS'
    });

    console.log(`OPTIONS 請求狀態: ${optionsResponse.status}`);
    console.log(`CORS 標頭: ${optionsResponse.headers.get('Access-Control-Allow-Origin')}`);
    console.log(`允許方法: ${optionsResponse.headers.get('Access-Control-Allow-Methods')}`);

    // 測試不支援的 HTTP 方法
    const getResponse = await fetch(`${API_BASE}/api/upload-image`, {
      method: 'GET'
    });

    console.log(`GET 請求狀態: ${getResponse.status} (應該是 405)`);

    if (getResponse.status === 405) {
      console.log('✅ API 端點正確拒絕不支援的方法');
    } else {
      console.log('❌ API 端點應該拒絕 GET 請求');
    }

  } catch (error) {
    console.log(`❌ API 端點測試失敗: ${error.message}`);
  }
}

// 併發測試
async function testConcurrentUploads() {
  console.log('\n🚀 測試併發上傳 (5個同時上傳)...');

  const promises = [];
  for (let i = 0; i < 5; i++) {
    const imageData = createTestImageData('small', 'png');
    const imageName = `concurrent-test-${i + 1}.png`;

    const promise = fetch(`${API_BASE}/api/upload-image`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageData, imageName })
    });
    promises.push(promise);
  }

  try {
    const results = await Promise.allSettled(promises);
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < results.length; i++) {
      if (results[i].status === 'fulfilled') {
        const response = results[i].value;
        if (response.ok) {
          successCount++;
          console.log(`✅ 併發上傳 ${i + 1} 成功`);
        } else {
          errorCount++;
          const error = await response.json();
          console.log(`❌ 併發上傳 ${i + 1} 失敗: ${error.error}`);
        }
      } else {
        errorCount++;
        console.log(`❌ 併發上傳 ${i + 1} 錯誤: ${results[i].reason}`);
      }
    }

    console.log(`\n併發測試結果: ${successCount} 成功, ${errorCount} 失敗`);

    if (successCount >= 4) {  // 允許1個失敗
      console.log('✅ 併發測試通過');
      return true;
    } else {
      console.log('❌ 併發測試失敗');
      return false;
    }

  } catch (error) {
    console.log(`❌ 併發測試錯誤: ${error.message}`);
    return false;
  }
}

// 主測試函數
async function main() {
  console.log('🧪 RentRipple 圖片上傳功能測試');
  console.log('🕒 ' + new Date().toLocaleString());

  // 測試 API 端點
  await testAPIEndpoint();

  // 執行主要測試
  const results = await runAllTests();

  // 測試併發上傳
  await testConcurrentUploads();

  console.log('\n🎉 所有測試執行完畢!');

  return results;
}

// Node.js 環境下執行
if (typeof module !== 'undefined' && module.exports) {
  main();
}

// 瀏覽器環境下可以手動呼叫
if (typeof window !== 'undefined') {
  window.testImageUpload = main;
  window.testAPI = testAPIEndpoint;
  window.testConcurrent = testConcurrentUploads;
}