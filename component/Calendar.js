import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CalendarHeader from './CalendarHeader';

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth());
  const [firstDayYoil, setFirstDayYoil] = useState(0); //첫 째 날 요일
  const [dayArray, setDayArray] = useState([]);

  // date 변경(화살표 클릭) 시 해당 월의 day배열 계산
  useEffect(() => {
    const newYear = date.getFullYear();
    const newMonth = date.getMonth();
    const newFirstDayYoil = new Date(newYear, newMonth, 1).getDay();
    const lastDate = new Date(newYear, newMonth + 1, 0).getDate();
    const previousLastDate = new Date(newYear, newMonth, 0).getDate();

    setYear(newYear);
    setMonth(newMonth);
    setFirstDayYoil(newFirstDayYoil);

    let dayArr = [];

    // 전 달에 대한 날짜 추가
    for (let i = 0; i < newFirstDayYoil; i++) {
      dayArr.push(previousLastDate - i);
    }
    dayArr.reverse();

    for (let i = 1; i <= lastDate; i++) {
      dayArr.push(i);
    }

    setDayArray(dayArr);

    console.log('date ==>', date);
    console.log('lastDate ==>', lastDate);
    console.log('firstDayIndex ==>', newFirstDayYoil);
  }, [date]);

  // 이전 달로 이동
  const goPrevMonth = () => {
    setDate(new Date(year, month - 1));
  };

  // 다음 달로 이동
  const goNextMonth = () => {
    setDate(new Date(year, month + 1));
  };

  return (
    <View style={styles.container}>
      <CalendarHeader
        date={date}
        onPrevMonth={goPrevMonth}
        onNextMonth={goNextMonth}
      />
      <View style={styles.weekRow}>
        {['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat'].map((day, index) => (
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
      <View style={styles.daysGrid}>
        {dayArray.map((day, index) => (
          <View style={styles.dayBox} key={index}>
            <TouchableOpacity
              onPress={() => {
                console.log('index ===>', index);
              }}>
              <Text
                style={
                  index < firstDayYoil ? styles.emptyDayText : styles.dayText
                }>
                {day}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
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
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    color: '#000',
  },
  emptyDayText: {
    color: '#999',
  },
});

export default Calendar;
