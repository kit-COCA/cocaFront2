import React from 'react';
import { createStore } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { DatePicker, List } from 'antd';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Calendar as AntCalendar } from 'antd';
import './MainPage.css'
import 'moment/locale/ko';  // Import Korean locale
import { useState, useEffect } from 'react';
import RCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Button } from 'antd';
import { SmileOutlined, SearchOutlined, StarOutlined, SettingOutlined } from '@ant-design/icons';
import { ListGroup } from 'react-bootstrap'; // React Bootstrap 라이브러리에서 ListGroup 컴포넌트를 가져옵니다.


moment.locale('ko');

// Create the localizer
const localizer = momentLocalizer(moment);

// Define your updateDate action creator
const updateDate = (newDate) => {
  return {
    type: 'UPDATE_DATE',
    payload: newDate
  };
};

// Define your reducer
const initialState = {
    date: moment(),
    groups: ['내 캘린더', '앱 개발자 취뽀그룹', '플러터 개발자그룹', '재수생 스터디그룹'] // 더미 데이터 추가
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_DATE':
        return { ...state, date: action.payload };
      default:
        return state;
    }
  };
  
  // Create your Redux store
  const store = createStore(reducer);
  

//미니캘린더 버전2 = React Calendar
const MiniCalendar = () => {
    const [date, setDate] = useState(new Date());

    const onChange = (newDate) => {
        setDate(newDate);
    };

    const formatShortWeekday = (locale, date) => {
        return ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
    };

    const formatDay = (locale, date) => {
        return date.getDate().toString();
    };

    return (
        <div className="calendar-component">
            <RCalendar 
                onChange={onChange} 
                value={date} 
                formatShortWeekday={formatShortWeekday}
                formatDay={formatDay}
            />
        </div>
    );
};

const GroupsList = () => {
    // Assume groups is an array of group names
    const groups = useSelector(state => state.groups);

    const [selectedGroup, setSelectedGroup] = useState(null); // 선택된 그룹을 추적하는 상태 변수를 추가합니다.

    const handleClick = (group) => {
        setSelectedGroup(group); // 클릭한 그룹을 선택된 그룹으로 설정합니다.
    };

    return (
        <div className="calendar-component">
            <ListGroup variant="flush">
                {groups.map(group => (
                    <ListGroup.Item 
                        style={{ 
                            borderRadius: '15px', 
                            backgroundColor: group === selectedGroup ? '#4CB3FF' : '#f8f9fa', // 선택된 그룹이면 배경색을 변경합니다.
                            color: group === selectedGroup ? 'white' : 'black', // 선택된 그룹이면 글자색을 변경합니다.
                            marginBottom: '10px', 
                            padding: '10px',
                            fontFamily: 'Noto Sans KR', // 폰트를 설정합니다.
                            fontWeight: group === selectedGroup ? 'bold' : 'normal' // 선택된 그룹이면 글자를 굵게 합니다.
                        }} 
                        onClick={() => handleClick(group)}
                    >
                        {group}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};


const ButtonPanel = () => {
    return (
        <div className="button-panel">
            <Button icon={<SmileOutlined style={{ fontSize: '30px' }} />} className="button disappointment">
                <div>친구</div>
            </Button>
            <Button icon={<SearchOutlined style={{ fontSize: '30px' }} />} className="button green-color">
                <div>그룹검색</div>
            </Button>
            <Button icon={<StarOutlined style={{ fontSize: '30px' }} />} className="button violet">
                <div>빈일정</div>
            </Button>
            <Button icon={<SettingOutlined style={{ fontSize: '30px' }} />} className="button navy-blue">
                <div>내설정</div>
            </Button>
        </div>
    );
};


const MainCalendar = ({onSlotSelect}) => {
    const [events, setEvents] = useState([
        {
            start: new Date(2024, 4, 1), // 5월 1일 (월은 0부터 시작하므로 4가 5월을 의미합니다)
            end: new Date(2024, 4, 1),
            title: '코딩',
        },
        {
            start: new Date(2024, 4, 17), // 5월 1일 (월은 0부터 시작하므로 4가 5월을 의미합니다)
            end: new Date(2024, 4, 20),
            title: '일본여행',
        },
    ]);

    const [selectedDate, setSelectedDate] = useState(null);

    // 선택한 날짜에 대한 이벤트를 찾는 함수
    const findEventsForSelectedDate = (date) => {
        return events.filter(event => {
            const eventStart = new Date(event.start).setHours(0, 0, 0, 0);
            const eventEnd = new Date(event.end).setHours(0, 0, 0, 0);
            const selectedDate = new Date(date).setHours(0, 0, 0, 0);
            return selectedDate >= eventStart && selectedDate <= eventEnd;
        });
    };

    const handleSelectEvent = event => {
        setSelectedDate({ start: event.start, end: event.end });
    };

    const handleSelectSlot = slotInfo => {
        //setSelectedDate({ start: slotInfo.start.toLocaleDateString(), end: slotInfo.end.toLocaleDateString() });
        onSlotSelect(); // newPanel을 열기 위해 MainPage에서 받은 함수를 호출
    };
    

    useEffect(() => {
        if (selectedDate) {
            window.alert(`선택한 날짜: ${selectedDate.start} - ${selectedDate.end}`);
        }
    }, [selectedDate]);

    return (
        <div className="calendar-component-main">
            <Calendar 
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%' }}
                views={['month']}
                selectable={true} // 이 부분을 확인해주세요.
                onSelectEvent={handleSelectEvent} // 일정 선택 시 handleSelectEvent 함수 호출
                onSelectSlot={handleSelectSlot} // 빈 슬롯 선택 시 handleSelectSlot 함수 호출
            />
        </div>
    );
};

function MainPage() {
    // 'default'와 'newPanel' 중 하나를 값으로 가질 수 있는 activePanel 상태 추가
    // 'default': 기본 left-panel을 보여줌, 'newPanel': 새로운 페이지를 left-panel에 보여줌
    const [activePanel, setActivePanel] = useState('default');

       // 여기에 onSlotSelect 함수를 정의합니다.
       const onSlotSelect = () => {
        setActivePanel('newPanel');
    };

    return (
        <Provider store={store}>
            <div className="App">
                <div className="left-panel">
                    {activePanel === 'default' ? (
                        // 기존의 left-panel 내용
                        <React.Fragment>
                            <MiniCalendar />
                            <div className="group-and-button">
                                <GroupsList />
                                <ButtonPanel />
                                {/* 여기에 버튼 추가: 버튼 클릭 시 새로운 페이지로 전환 */}
                                {/* <button onClick={() => setActivePanel('newPanel')}>새 페이지로</button> */}
                            </div>
                        </React.Fragment>
                    ) : (
                        // 새로운 페이지 내용
                        <React.Fragment>
                            {/* x 버튼: 클릭 시 기존의 left-panel 보여줌 */}
                            <button onClick={() => setActivePanel('default')}>X</button>
                            {/* 새로운 페이지 컴포넌트 또는 내용 */}
                        </React.Fragment>
                    )}
                </div>
                <div className="right-panel">
                    <MainCalendar onSlotSelect={onSlotSelect} />
                </div>
            </div>
        </Provider>
    );
}

export default MainPage;
