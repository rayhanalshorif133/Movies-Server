
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzBitNkcvoaAK7KFPo2dXZxh9WEeIlRaK1HwZOClAvtNmtUS7p1U7JYqJmnAcWKvNumRw/exec";


export async function uploadImageInGoogleDrive(file) {
  if (!file) return null;

  // ১. ফাইলটিকে Base64 এ রূপান্তর
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  try {
    const base64Data = await convertToBase64(file);

    const payload = {
      base64: base64Data,
      mimeType: file.type,
      fileName: file.name,
    };

    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8', // Apps Script POST রিকোয়েস্টের জন্য অনেক সময় এটি লাগে
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    return result.id;
  } catch (error) {
    console.error("Upload Error:", error);
    return null;
  }
}