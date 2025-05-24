import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CalendarHeader from './CalendarHeader';

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth());
  const [firstWeekDay, setFirstWeekDay] = useState(0); //첫 째 날 요일 인덱스(0: 일요일, 1: 월요일)
  const [dateArray, setDateArray] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const yoilArr = ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat'];

  // date 변경(화살표 클릭) 시 해당 월의 day배열 계산
  useEffect(() => {
    const newYear = date.getFullYear();
    const newMonth = date.getMonth();
    const newFirstWeekDay = new Date(newYear, newMonth, 1).getDay();
    const lastDate = new Date(newYear, newMonth + 1, 0).getDate();
    const previousLastDate = new Date(newYear, newMonth, 0).getDate();

    setYear(newYear);
    setMonth(newMonth);
    setFirstWeekDay(newFirstWeekDay);

    let dateArr = [];

    // 전 달에 대한 날짜 추가
    for (let i = 0; i < newFirstWeekDay; i++) {
      dateArr.push({
        year: newYear,
        month: newMonth - 1,
        day: previousLastDate - i,
      });
    }
    dateArr.reverse();

    // 현재 달 날짜 추가
    for (let i = 1; i <= lastDate; i++) {
      dateArr.push({
        year: newYear,
        month: newMonth,
        day: i,
      });
    }

    setDateArray(dateArr);
  }, [date]);

  // 이전 달로 이동
  const goPrevMonth = () => {
    setDate(new Date(year, month - 1));
  };

  // 다음 달로 이동
  const goNextMonth = () => {
    setDate(new Date(year, month + 1));
  };

  const selectDay = _dateObj => {
    setSelectedDate(_dateObj);
  };

  const renderDays = () => {
    return (
      <View style={styles.daysGrid}>
        {dateArray.map((dateObj, index) => {
          const isSelected =
            selectedDate &&
            dateObj.year === selectedDate.year &&
            dateObj.month === selectedDate.month &&
            dateObj.day === selectedDate.day;
          return (
            <TouchableOpacity
              style={styles.dayBox}
              key={index}
              onPress={() => selectDay(dateObj)}>
              <View style={isSelected && styles.selectedDayButton} key={index}>
                <Text
                  style={[
                    index < firstWeekDay ? styles.emptyDayText : styles.dayText,
                    isSelected && styles.selectedDayText,
                  ]}>
                  {dateObj.day}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CalendarHeader
        date={date}
        onPrevMonth={goPrevMonth}
        onNextMonth={goNextMonth}
      />
      <View style={styles.weekRow}>
        {yoilArr.map((day, index) => (
          <Text
            style={[
              styles.weekDay,
              day === 'Sun' && styles.sunday,
              day === 'Sat' && styles.saturday,
            ]}
            key={index}>
            {day}
          </Text>
        ))}
      </View>
      {renderDays()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  weekRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  weekDay: {
    flex: 1,
    textAlign: 'center',
    color: '#666',
  },
  sunday: {
    color: 'red',
  },
  saturday: {
    color: 'skyblue',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayBox: {
    width: '14.28%',
    height: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDayButton: {
    width: '50%',
    height: '50%',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    color: '#000',
  },
  emptyDayText: {
    color: '#999',
  },
  selectedDayText: {
    fontWeight: 'bold',
  },
});

export default Calendar;
