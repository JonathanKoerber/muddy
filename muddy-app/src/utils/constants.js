export const requestBase = "https://packtpublishing.github.io/Simplifying-State-Management-in-React-Native";
export const TOCKEN_KEY = "jwt-token";
const my_ip = "192.168.0.5";
export const URL = "https://"+my_ip+":8000/api/";
export const LOGIN_URL_BASE = "https://"+my_ip+":8000/api/auth/login/";

export const WORKSHEETS = [
    {
        'id': '1',
        'title': 'Worksheet 1',
        'description': 'This is the first worksheet',
        'questions': [
            {'questionId': '1', 'question': '1 + 1 = ?', 'answer': '2'},
            {'questionId': '2', 'question': '1 + 2 = ?', 'answer': '3'},
            {'questionId': '3', 'question': '1 + 3 = ?', 'answer': '4'},
            {'questionId': '4', 'question': '1 + 4 = ?', 'answer': '5'}
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