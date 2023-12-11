export const requestBase = "https://packtpublishing.github.io/Simplifying-State-Management-in-React-Native";
export const TOKEN_KEY = "jwt-token";
export const REFRESH_TOKEN_KEY = "refresh-token";
export const USER_ID = "user-id"
const my_ip = "https://318c-97-113-159-210.ngrok-free.app"

export const URL = my_ip+"/api/";
export const URL_ADMIN = "https://"+my_ip+"/admin/";
export const LOGIN_PATH = "/auth/login/";
export const REGISTER_PATH = "/auth/register/";
export const OCR_PATH = "ocr/"
export const POST_PATH = "post/"
export const USER_PATH = "user/"
export const WORKSHEETS = [
    {
        'id': '1',
        'title': 'Worksheet 1',
        'description': 'This is the first worksheet',
        'questions': [
            {'questionId': '1', 'question': '1 + 1 = ?', 'answer': '2'},
            {'questionId': '2', 'question': '1 + 2 = ?', 'answer': '3'},
            {'questionId': '3', 'question': '1 + 3 = ?', 'answer': '4'},
            {'questionId': '4', 'question': '1 + 4 = ?', 'answer': '5'},
            {'questionId': '5', 'question': '1 + 5 = ?', 'answer': '6'},
        ]
    },
    {
        'id': '2',
        'title': 'Worksheet 2',
        'description': 'This is the second worksheet', // Corrected description
        'questions': [
            {'questionId': '1', 'question': '1 + 1 = ?', 'answer': ['2', '3', '4', '5']},
            {'questionId': '2', 'question': '1 + 2 = ?', 'answer': ['2', '3', '4', '5']},
            {'questionId': '3', 'question': '1 + 3 = ?', 'answer': ['2', '3', '4', '5']},
            {'questionId': '4', 'question': '1 + 4 = ?', 'answer': ['2', '3', '4', '5']}
        ]
    }
];