import { useEffect, useState } from 'react';
import axios from 'axios';

import {
    Card,
    CardAction,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
    BookOpenIcon,
    CircleCheckBigIcon,
    TrendingDownIcon,
    TrendingUpIcon,
    XCircleIcon,
} from 'lucide-react';
import { toast } from 'sonner';
import SubjectOverviewCard from '@/components/SubjectOverviewCard';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@/components/ui/spinner';

type subject = {
    name: string;
    classesAttended: number;
    totalClasses: number;
    occurrence: number[];
};

const DashboardPage = () => {
    const navigate = useNavigate();
    const [subjects, setSubjects] = useState<subject[]>([]);
    const [loading, setLoading] = useState(true);
    const [classesToday, setClassesToday] = useState<subject[]>([]);
    const [classesAttended, setClassesAttended] = useState(0);
    const [totalClasses, setTotalClasses] = useState(0);
    const [classesTodayString, setClassesTodayString] = useState('');
    const getSubjectData = async () => {
        try {
            const { data } = await axios.get('/api/sub/');
            if (data.ok) {
                setSubjects(data.subjects);
                let classesString = '';
                let attended = 0;
                let total = 0;
                let classes: typeof data.subjects = [];
                for (const sub of data.subjects) {
                    for (
                        let i = 0;
                        i < sub.occurrence[new Date().getDay()];
                        i++
                    )
                        classes.push(sub);
                    if (sub.occurrence[new Date().getDay()] >= 1)
                        classesString = classesString + ' ' + sub.name;
                    if (sub.occurrence[new Date().getDay()] > 1)
                        classesString =
                            classesString +
                            `_x${sub.occurrence[new Date().getDay()]}`;
                    attended += sub.classesAttended;
                    total += sub.totalClasses;
                }
                setClassesTodayString(classesString);
                setClassesToday(classes);
                setClassesAttended(attended);
                setTotalClasses(total);
            }
        } catch (e) {
            toast.error('Internal Server Error', {
                position: 'top-center',
            });
            console.log(e);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getSubjectData();
    }, []);
    async function markAll(present: boolean) {
        setLoading(true);
        try {
            for (const sub of classesToday) {
                sub.totalClasses++;
                if (present) sub.classesAttended++;
                const { data } = await axios.patch('/api/sub', {
                    subjectName: sub.name,
                    newTotalClasses: sub.totalClasses,
                    newClassesAttended: sub.classesAttended,
                });
                if (data.ok)
                    toast.success(
                        `${sub.name} marked ${present ? 'present' : 'absent'}`,
                        {
                            position: 'top-center',
                        }
                    );
                else
                    toast.error(
                        ` error marking ${present ? 'present' : 'absent'} for ${sub.name} : ${data.message}`,
                        {
                            position: 'top-center',
                        }
                    );
            }
        } catch (e) {
            toast.error('internal server error', {
                position: 'top-center',
            });
            console.log(e);
        } finally {
            setLoading(false);
            await getSubjectData();
        }
    }
    if (loading)
        return (
            <div className="flex pt-56 flex-1 justify-center items-center">
                <Spinner />
            </div>
        );
    else
        return (
            <>
                <h1 className={'text-3xl font-extrabold'}>Dashboard</h1>
                <p className={'text-muted-foreground'}>
                    Over view of your attendance
                </p>
                <section className={'my-5'}>
                    <h2 className={'text-2xl font-bold mb-3'}>Quick Actions</h2>
                    <div
                        className={
                            'flex flex-col justify-start gap-2 flex-nowrap'
                        }
                    >
                        <p>
                            <span className={'font-bold'}>Classes today:</span>{' '}
                            {classesToday ? classesTodayString : 'none'}{' '}
                        </p>
                        <div
                            className={
                                'flex flex-row gap-2 items-center justify-start flex-wrap'
                            }
                        >
                            <Button
                                onClick={async () => await markAll(true)}
                                variant={'outline'}
                            >
                                Mark all present
                            </Button>
                            <Button
                                onClick={async () => await markAll(false)}
                                variant={'outline'}
                            >
                                Mark all absent
                            </Button>
                            <Button
                                onClick={() => navigate('/subjects')}
                                variant={'outline'}
                            >
                                Mark custom
                            </Button>
                        </div>
                    </div>
                </section>
                <section className={'my-5'}>
                    <Card className={'my-5'}>
                        <CardHeader>
                            <CardTitle>Overall Attendance</CardTitle>
                            <CardAction>
                                {totalClasses &&
                                Math.floor(
                                    (classesAttended / totalClasses) * 100
                                ) >= 75 ? (
                                    <TrendingUpIcon
                                        className={'stroke-green-500'}
                                    />
                                ) : (
                                    <TrendingDownIcon
                                        className={'stroke-red-500'}
                                    />
                                )}
                            </CardAction>
                        </CardHeader>
                        <CardContent>
                            <p className={'text-5xl font-extrabold'}>
                                {totalClasses
                                    ? Math.floor(
                                          (classesAttended / totalClasses) * 100
                                      )
                                    : 0}
                                %
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Progress
                                progressColor={
                                    totalClasses &&
                                    Math.floor(
                                        (classesAttended / totalClasses) * 100
                                    ) >= 75
                                        ? 'bg-green-500'
                                        : 'bg-red-500'
                                }
                                className={
                                    totalClasses &&
                                    Math.floor(
                                        (classesAttended / totalClasses) * 100
                                    ) >= 75
                                        ? 'bg-green-500/50'
                                        : 'bg-red-500/50'
                                }
                                value={
                                    totalClasses > 0
                                        ? Math.floor(
                                              (classesAttended / totalClasses) *
                                                  100
                                          )
                                        : 0
                                }
                            />
                        </CardFooter>
                    </Card>
                    <div className={'flex gap-5'}>
                        <Card className={'w-full'}>
                            <CardHeader>
                                <CircleCheckBigIcon
                                    size={40}
                                    className={
                                        'rounded-xl p-2 bg-green-200 stroke-green-500'
                                    }
                                />
                                <p className={'text-xl font-bold'}>
                                    {classesAttended}
                                </p>
                                <p className={'text-muted-foreground'}>
                                    Classes Attended
                                </p>
                            </CardHeader>
                        </Card>
                        <Card className={'w-full'}>
                            <CardHeader>
                                <BookOpenIcon
                                    size={40}
                                    className={
                                        'rounded-xl p-2 bg-[#DAE1F9] stroke-primary'
                                    }
                                />
                                <p className={'text-xl font-bold'}>
                                    {totalClasses}
                                </p>
                                <p className={'text-muted-foreground'}>
                                    Total Classes
                                </p>
                            </CardHeader>
                        </Card>
                        <Card className={'w-full'}>
                            <CardHeader>
                                <XCircleIcon
                                    size={40}
                                    className={
                                        'rounded-xl p-2 bg-red-200 stroke-red-500'
                                    }
                                />
                                <p className={'text-xl font-bold'}>
                                    {totalClasses - classesAttended}
                                </p>
                                <p className={'text-muted-foreground'}>
                                    Classes Attended
                                </p>
                            </CardHeader>
                        </Card>
                    </div>
                </section>
                <section className={'my-5'}>
                    <h2 className={'text-2xl font-bold mb-3'}>
                        Subjects overview
                    </h2>
                    <div
                        className={
                            'grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
                        }
                    >
                        {subjects.map((sub) => {
                            return (
                                <SubjectOverviewCard key={sub.name} {...sub} />
                            );
                        })}
                    </div>
                </section>
            </>
        );
};

export default DashboardPage;
