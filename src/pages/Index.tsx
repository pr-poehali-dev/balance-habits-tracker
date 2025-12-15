import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

interface Goal {
  id: string;
  sphere: string;
  title: string;
  description: string;
  deadline: Date;
  progress: number;
  specific: string;
  measurable: string;
  achievable: string;
  relevant: string;
  timeBound: string;
}

interface Event {
  id: string;
  title: string;
  sphere: string;
  date: Date;
  time: string;
  location?: string;
  cost?: number;
  linkedGoalId?: string;
}

interface Habit {
  id: string;
  sphere: string;
  title: string;
  completedDates: Date[];
}

const spheres = [
  { name: 'Саморазвитие', icon: 'BookOpen', color: '#9b87f5' },
  { name: 'Бизнес', icon: 'Briefcase', color: '#7E69AB' },
  { name: 'Карьера', icon: 'TrendingUp', color: '#6E59A5' },
  { name: 'Отношения', icon: 'Heart', color: '#D946EF' },
  { name: 'Семья', icon: 'Users', color: '#8B5CF6' },
  { name: 'Дети', icon: 'Baby', color: '#F97316' },
  { name: 'Здоровье', icon: 'Activity', color: '#0EA5E9' },
  { name: 'Спорт', icon: 'Dumbbell', color: '#10B981' },
  { name: 'Увлечения', icon: 'Palette', color: '#F59E0B' },
  { name: 'Отдых', icon: 'Plane', color: '#EC4899' },
  { name: 'Квартира', icon: 'Home', color: '#8B5CF6' },
  { name: 'Финансы', icon: 'DollarSign', color: '#10B981' },
];

const Index = () => {
  const { toast } = useToast();
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      sphere: 'Здоровье',
      title: 'Вылечить зубы к НГ',
      description: 'Записаться к стоматологу и пройти курс лечения',
      deadline: new Date('2024-12-31'),
      progress: 30,
      specific: 'Вылечить 3 зуба',
      measurable: 'Посещения стоматолога',
      achievable: 'Найден хороший врач',
      relevant: 'Важно для здоровья',
      timeBound: 'До конца декабря 2024',
    },
  ]);

  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Приём у стоматолога',
      sphere: 'Здоровье',
      date: new Date('2024-12-20'),
      time: '18:00',
      location: 'Клиника "Дентал", каб. 305',
      cost: 5000,
      linkedGoalId: '1',
    },
    {
      id: '2',
      title: 'Перевести на ипотеку',
      sphere: 'Финансы',
      date: new Date('2024-12-20'),
      time: '12:00',
      cost: 20000,
    },
  ]);

  const [habits, setHabits] = useState<Habit[]>([
    {
      id: '1',
      sphere: 'Спорт',
      title: 'Утренняя пробежка',
      completedDates: [new Date('2024-12-15'), new Date('2024-12-14'), new Date('2024-12-13')],
    },
  ]);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [newGoalOpen, setNewGoalOpen] = useState(false);
  const [newEventOpen, setNewEventOpen] = useState(false);
  const [newHabitOpen, setNewHabitOpen] = useState(false);

  const [newGoal, setNewGoal] = useState({
    sphere: '',
    title: '',
    description: '',
    specific: '',
    measurable: '',
    achievable: '',
    relevant: '',
    deadline: '',
  });

  const [newEvent, setNewEvent] = useState({
    title: '',
    sphere: '',
    date: '',
    time: '',
  });

  const [newHabit, setNewHabit] = useState({
    sphere: '',
    title: '',
  });

  const getSphereProgress = (sphereName: string) => {
    const sphereGoals = goals.filter(g => g.sphere === sphereName);
    if (sphereGoals.length === 0) return 0;
    return Math.round(
      sphereGoals.reduce((sum, g) => sum + g.progress, 0) / sphereGoals.length
    );
  };

  const updateGoalProgress = (goalId: string, newProgress: number) => {
    setGoals(goals.map(goal => 
      goal.id === goalId ? { ...goal, progress: newProgress } : goal
    ));
    toast({
      title: "Прогресс обновлен",
      description: `Прогресс цели установлен на ${newProgress}%`,
    });
  };

  const addGoal = () => {
    if (!newGoal.sphere || !newGoal.title || !newGoal.deadline) {
      toast({
        title: "Ошибка",
        description: "Заполните обязательные поля: сфера, название и срок",
        variant: "destructive",
      });
      return;
    }

    const goal: Goal = {
      id: Date.now().toString(),
      sphere: newGoal.sphere,
      title: newGoal.title,
      description: newGoal.description,
      deadline: new Date(newGoal.deadline),
      progress: 0,
      specific: newGoal.specific,
      measurable: newGoal.measurable,
      achievable: newGoal.achievable,
      relevant: newGoal.relevant,
      timeBound: `До ${new Date(newGoal.deadline).toLocaleDateString('ru-RU')}`,
    };

    setGoals([...goals, goal]);
    setNewGoalOpen(false);
    setNewGoal({
      sphere: '',
      title: '',
      description: '',
      specific: '',
      measurable: '',
      achievable: '',
      relevant: '',
      deadline: '',
    });
    
    toast({
      title: "Цель добавлена!",
      description: `Цель "${newGoal.title}" успешно создана`,
    });
  };

  const addEvent = () => {
    if (!newEvent.title || !newEvent.sphere || !newEvent.date || !newEvent.time) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля",
        variant: "destructive",
      });
      return;
    }

    const event: Event = {
      id: Date.now().toString(),
      title: newEvent.title,
      sphere: newEvent.sphere,
      date: new Date(newEvent.date),
      time: newEvent.time,
    };

    setEvents([...events, event]);
    setNewEventOpen(false);
    setNewEvent({
      title: '',
      sphere: '',
      date: '',
      time: '',
    });
    
    toast({
      title: "Событие добавлено!",
      description: `"${newEvent.title}" на ${new Date(newEvent.date).toLocaleDateString('ru-RU')}`,
    });
  };

  const addHabit = () => {
    if (!newHabit.sphere || !newHabit.title) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля",
        variant: "destructive",
      });
      return;
    }

    const habit: Habit = {
      id: Date.now().toString(),
      sphere: newHabit.sphere,
      title: newHabit.title,
      completedDates: [],
    };

    setHabits([...habits, habit]);
    setNewHabitOpen(false);
    setNewHabit({
      sphere: '',
      title: '',
    });
    
    toast({
      title: "Привычка добавлена!",
      description: `Привычка "${newHabit.title}" создана`,
    });
  };

  const toggleHabitCompletion = (habitId: string, date: Date) => {
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        const dateStr = date.toDateString();
        const isCompleted = habit.completedDates.some(d => d.toDateString() === dateStr);
        return {
          ...habit,
          completedDates: isCompleted
            ? habit.completedDates.filter(d => d.toDateString() !== dateStr)
            : [...habit.completedDates, date]
        };
      }
      return habit;
    }));
  };

  const getEventsForDate = (date: Date | undefined) => {
    if (!date) return [];
    return events.filter(e => e.date.toDateString() === date.toDateString());
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 lg:p-8 max-w-7xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Колесо Баланса</h1>
          <p className="text-muted-foreground">Управляй своей жизнью осознанно</p>
        </header>

        <Tabs defaultValue="roadmap" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-[600px]">
            <TabsTrigger value="roadmap">Роадмэп</TabsTrigger>
            <TabsTrigger value="wheel">Колесо</TabsTrigger>
            <TabsTrigger value="goals">Цели</TabsTrigger>
            <TabsTrigger value="habits">Привычки</TabsTrigger>
            <TabsTrigger value="calendar">Календарь</TabsTrigger>
          </TabsList>

          <TabsContent value="roadmap" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Баланс Сфер</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <div className="relative w-48 h-48 mb-6">
                      <svg viewBox="0 0 100 100" className="transform -rotate-90">
                        {spheres.slice(0, 4).map((sphere, i) => {
                          const progress = getSphereProgress(sphere.name);
                          const startAngle = (i * 90);
                          const endAngle = startAngle + 90;
                          const radius = 40;
                          const cx = 50;
                          const cy = 50;
                          
                          const x1 = cx + radius * Math.cos((startAngle * Math.PI) / 180);
                          const y1 = cy + radius * Math.sin((startAngle * Math.PI) / 180);
                          const x2 = cx + radius * Math.cos((endAngle * Math.PI) / 180);
                          const y2 = cy + radius * Math.sin((endAngle * Math.PI) / 180);
                          
                          return (
                            <path
                              key={sphere.name}
                              d={`M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`}
                              fill={sphere.color}
                              opacity={0.7 + (progress / 200)}
                            />
                          );
                        })}
                        <circle cx="50" cy="50" r="20" fill="white" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-primary">
                            {Math.round(spheres.slice(0, 4).reduce((sum, s) => sum + getSphereProgress(s.name), 0) / 4) / 10}
                          </div>
                          <div className="text-xs text-muted-foreground">Средний</div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 w-full text-xs">
                      {spheres.slice(0, 4).map((sphere) => (
                        <div key={sphere.name} className="flex items-center gap-2">
                          <span 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: sphere.color }}
                          />
                          <span>{sphere.name} ({getSphereProgress(sphere.name) / 10})</span>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      Обновить оценки
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-2 space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Роадмэп событий</h2>
                  <Dialog open={newEventOpen} onOpenChange={setNewEventOpen}>
                    <DialogTrigger asChild>
                      <Button className="shadow-lg">
                        <Icon name="Plus" size={16} className="mr-2" />
                        Новая задача
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Новое событие</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label>Название *</Label>
                          <Input 
                            placeholder="Например: Приём у врача" 
                            value={newEvent.title}
                            onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Сфера *</Label>
                          <Select value={newEvent.sphere} onValueChange={(value) => setNewEvent({...newEvent, sphere: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите сферу" />
                            </SelectTrigger>
                            <SelectContent>
                              {spheres.map(s => (
                                <SelectItem key={s.name} value={s.name}>{s.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Дата *</Label>
                            <Input 
                              type="date" 
                              value={newEvent.date}
                              onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Время *</Label>
                            <Input 
                              type="time" 
                              value={newEvent.time}
                              onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                            />
                          </div>
                        </div>
                        <Button className="w-full" onClick={addEvent}>Создать событие</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="relative border-l-2 border-border ml-4 space-y-8">
                  <div className="relative pl-8">
                    <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-background"></span>
                    <div className="mb-3 font-bold text-muted-foreground uppercase text-xs tracking-wider">
                      Сегодня, {new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
                    </div>
                    
                    {habits.map((habit) => {
                      const sphere = spheres.find(s => s.name === habit.sphere);
                      const today = new Date();
                      const isCompletedToday = habit.completedDates.some(
                        d => d.toDateString() === today.toDateString()
                      );
                      
                      return (
                        <div 
                          key={habit.id}
                          className="bg-card p-4 rounded-xl shadow-sm border mb-3 flex items-center gap-4 hover:shadow-md transition-shadow"
                        >
                          <div 
                            className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                            style={{ backgroundColor: `${sphere?.color}20` }}
                          >
                            🏃
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                              <h3 className="font-bold">{habit.title}</h3>
                              <Badge 
                                className="text-xs"
                                style={{ backgroundColor: sphere?.color }}
                              >
                                {habit.sphere}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">Привычка • Ежедневно</p>
                          </div>
                          <input 
                            type="checkbox" 
                            checked={isCompletedToday}
                            onChange={() => toggleHabitCompletion(habit.id, today)}
                            className="w-6 h-6 text-primary rounded focus:ring-primary cursor-pointer" 
                          />
                        </div>
                      );
                    })}
                  </div>

                  {Array.from(new Set(events.map(e => e.date.toDateString())))
                    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
                    .map((dateStr) => {
                      const date = new Date(dateStr);
                      const dateEvents = events.filter(e => e.date.toDateString() === dateStr);
                      const isToday = date.toDateString() === new Date().toDateString();
                      
                      return (
                        <div key={dateStr} className="relative pl-8">
                          <span 
                            className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-4 border-background ${
                              isToday ? 'bg-primary' : 'bg-muted-foreground'
                            }`}
                          ></span>
                          <div className="mb-3 font-bold text-muted-foreground uppercase text-xs tracking-wider">
                            {date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
                          </div>
                          
                          {dateEvents.map((event) => {
                            const sphere = spheres.find(s => s.name === event.sphere);
                            const linkedGoal = event.linkedGoalId 
                              ? goals.find(g => g.id === event.linkedGoalId) 
                              : null;
                            
                            return (
                              <div 
                                key={event.id}
                                className="bg-card p-5 rounded-xl shadow-sm border mb-3 hover:shadow-md transition-shadow group cursor-pointer relative overflow-hidden"
                              >
                                <div 
                                  className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-xl"
                                  style={{ backgroundColor: sphere?.color }}
                                />
                                
                                <div className="pl-3">
                                  {linkedGoal && (
                                    <div className="text-xs font-bold mb-1 flex items-center gap-2"
                                      style={{ color: sphere?.color }}
                                    >
                                      <Icon name="Target" size={12} />
                                      Цель: {linkedGoal.title}
                                      <div className="w-16 h-1.5 bg-muted rounded-full ml-1">
                                        <div 
                                          className="h-1.5 rounded-full"
                                          style={{ 
                                            width: `${linkedGoal.progress}%`,
                                            backgroundColor: sphere?.color 
                                          }}
                                        />
                                      </div>
                                    </div>
                                  )}
                                  
                                  <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-bold">{event.title}</h3>
                                    <div className="text-right ml-4">
                                      <div className="text-lg font-bold">{event.time}</div>
                                      <div className="text-xs text-muted-foreground">
                                        {date.toLocaleDateString('ru-RU', { weekday: 'short' })}
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                    {event.location && (
                                      <div className="flex items-center gap-1">
                                        <Icon name="MapPin" size={14} />
                                        {event.location}
                                      </div>
                                    )}
                                    {event.cost && (
                                      <div className="flex items-center gap-1">
                                        <Icon name="Wallet" size={14} />
                                        {event.cost.toLocaleString('ru-RU')} ₽
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="wheel" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Визуализация баланса жизни</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {spheres.map((sphere) => {
                    const progress = getSphereProgress(sphere.name);
                    return (
                      <div
                        key={sphere.name}
                        className="p-4 rounded-lg border border-border bg-card hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: `${sphere.color}20` }}
                          >
                            <Icon
                              name={sphere.icon as any}
                              size={20}
                              style={{ color: sphere.color }}
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground">{sphere.name}</h3>
                            <p className="text-sm text-muted-foreground">{progress}%</p>
                          </div>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Цели по SMART</h2>
              <Dialog open={newGoalOpen} onOpenChange={setNewGoalOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить цель
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Новая цель по SMART</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Сфера *</Label>
                      <Select value={newGoal.sphere} onValueChange={(value) => setNewGoal({...newGoal, sphere: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите сферу" />
                        </SelectTrigger>
                        <SelectContent>
                          {spheres.map(s => (
                            <SelectItem key={s.name} value={s.name}>{s.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Название цели *</Label>
                      <Input 
                        placeholder="Например: Лечение зубов" 
                        value={newGoal.title}
                        onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Описание</Label>
                      <Textarea 
                        placeholder="Подробное описание цели" 
                        value={newGoal.description}
                        onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Specific (Конкретность)</Label>
                        <Input 
                          placeholder="Что именно нужно сделать?" 
                          value={newGoal.specific}
                          onChange={(e) => setNewGoal({...newGoal, specific: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Measurable (Измеримость)</Label>
                        <Input 
                          placeholder="Как измерить результат?" 
                          value={newGoal.measurable}
                          onChange={(e) => setNewGoal({...newGoal, measurable: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Achievable (Достижимость)</Label>
                        <Input 
                          placeholder="Почему это достижимо?" 
                          value={newGoal.achievable}
                          onChange={(e) => setNewGoal({...newGoal, achievable: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Relevant (Актуальность)</Label>
                        <Input 
                          placeholder="Зачем это нужно?" 
                          value={newGoal.relevant}
                          onChange={(e) => setNewGoal({...newGoal, relevant: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Time-bound (Срок) *</Label>
                      <Input 
                        type="date" 
                        value={newGoal.deadline}
                        onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                      />
                    </div>
                    <Button className="w-full" onClick={addGoal}>Создать цель</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {goals.map((goal) => {
                const sphere = spheres.find(s => s.name === goal.sphere);
                return (
                  <Card key={goal.id} className="animate-fade-in">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge style={{ backgroundColor: sphere?.color }}>
                              {goal.sphere}
                            </Badge>
                            <Badge variant="outline">
                              {goal.deadline.toLocaleDateString('ru-RU')}
                            </Badge>
                          </div>
                          <CardTitle className="text-xl">{goal.title}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            {goal.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">{goal.progress}%</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4 space-y-2">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>Прогресс выполнения</span>
                          <span className="font-semibold">{goal.progress}%</span>
                        </div>
                        <Slider
                          value={[goal.progress]}
                          onValueChange={(value) => updateGoalProgress(goal.id, value[0])}
                          max={100}
                          step={5}
                          className="cursor-pointer"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="font-semibold">S:</span> {goal.specific}
                        </div>
                        <div>
                          <span className="font-semibold">M:</span> {goal.measurable}
                        </div>
                        <div>
                          <span className="font-semibold">A:</span> {goal.achievable}
                        </div>
                        <div>
                          <span className="font-semibold">R:</span> {goal.relevant}
                        </div>
                        <div className="col-span-2">
                          <span className="font-semibold">T:</span> {goal.timeBound}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="habits" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Трекер привычек</h2>
              <Dialog open={newHabitOpen} onOpenChange={setNewHabitOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить привычку
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Новая привычка</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Сфера *</Label>
                      <Select value={newHabit.sphere} onValueChange={(value) => setNewHabit({...newHabit, sphere: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите сферу" />
                        </SelectTrigger>
                        <SelectContent>
                          {spheres.map(s => (
                            <SelectItem key={s.name} value={s.name}>{s.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Название привычки *</Label>
                      <Input 
                        placeholder="Например: Утренняя зарядка" 
                        value={newHabit.title}
                        onChange={(e) => setNewHabit({...newHabit, title: e.target.value})}
                      />
                    </div>
                    <Button className="w-full" onClick={addHabit}>Создать привычку</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {habits.map((habit) => {
                const sphere = spheres.find(s => s.name === habit.sphere);
                const last7Days = Array.from({ length: 7 }, (_, i) => {
                  const date = new Date();
                  date.setDate(date.getDate() - (6 - i));
                  return date;
                });

                return (
                  <Card key={habit.id} className="animate-scale-in">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <Badge style={{ backgroundColor: sphere?.color }} className="mb-2">
                            {habit.sphere}
                          </Badge>
                          <CardTitle className="text-lg">{habit.title}</CardTitle>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {habit.completedDates.length} дней
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        {last7Days.map((date) => {
                          const isCompleted = habit.completedDates.some(
                            d => d.toDateString() === date.toDateString()
                          );
                          return (
                            <button
                              key={date.toISOString()}
                              onClick={() => toggleHabitCompletion(habit.id, date)}
                              className={`flex-1 p-3 rounded-lg border transition-all ${
                                isCompleted
                                  ? 'bg-primary text-primary-foreground border-primary'
                                  : 'bg-muted border-border hover:border-primary'
                              }`}
                            >
                              <div className="text-xs mb-1">
                                {date.toLocaleDateString('ru-RU', { weekday: 'short' })}
                              </div>
                              <div className="text-lg font-bold">
                                {date.getDate()}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Календарь событий</h2>
              <Dialog open={newEventOpen} onOpenChange={setNewEventOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить событие
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Новое событие</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Название *</Label>
                      <Input 
                        placeholder="Например: Приём у терапевта" 
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Сфера *</Label>
                      <Select value={newEvent.sphere} onValueChange={(value) => setNewEvent({...newEvent, sphere: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите сферу" />
                        </SelectTrigger>
                        <SelectContent>
                          {spheres.map(s => (
                            <SelectItem key={s.name} value={s.name}>{s.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Дата *</Label>
                        <Input 
                          type="date" 
                          value={newEvent.date}
                          onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Время *</Label>
                        <Input 
                          type="time" 
                          value={newEvent.time}
                          onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                        />
                      </div>
                    </div>
                    <Button className="w-full" onClick={addEvent}>Создать событие</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    События на {selectedDate?.toLocaleDateString('ru-RU', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {getEventsForDate(selectedDate).length > 0 ? (
                      getEventsForDate(selectedDate).map((event) => {
                        const sphere = spheres.find(s => s.name === event.sphere);
                        return (
                          <div
                            key={event.id}
                            className="p-4 rounded-lg border border-border bg-muted/50"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <Icon name="Clock" size={16} className="text-muted-foreground" />
                              <span className="font-semibold">{event.time}</span>
                              <Badge style={{ backgroundColor: sphere?.color }}>
                                {event.sphere}
                              </Badge>
                            </div>
                            <p className="text-foreground">{event.title}</p>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-muted-foreground text-center py-8">
                        Событий на эту дату нет
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
