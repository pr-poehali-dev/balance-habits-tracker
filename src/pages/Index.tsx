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
      title: 'Лечение зубов',
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
      title: 'Приём у терапевта',
      sphere: 'Здоровье',
      date: new Date('2024-12-20'),
      time: '18:00',
    },
  ]);

  const [habits, setHabits] = useState<Habit[]>([
    {
      id: '1',
      sphere: 'Спорт',
      title: 'Утренняя зарядка',
      completedDates: [new Date('2024-12-14'), new Date('2024-12-13')],
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

        <Tabs defaultValue="wheel" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[500px]">
            <TabsTrigger value="wheel">Колесо</TabsTrigger>
            <TabsTrigger value="goals">Цели</TabsTrigger>
            <TabsTrigger value="habits">Привычки</TabsTrigger>
            <TabsTrigger value="calendar">Календарь</TabsTrigger>
          </TabsList>

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
