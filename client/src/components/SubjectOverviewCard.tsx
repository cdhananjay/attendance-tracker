import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TriangleAlertIcon } from 'lucide-react';

type props = {
    name: string;
    totalClasses: number;
    classesAttended: number;
};

const SubjectOverviewCard = ({ name, totalClasses, classesAttended }: props) => {
    return (
        <Card className={'gap-0'}>
            <CardHeader>
                <CardTitle className={'text-lg'}>{name}</CardTitle>
                <CardAction>
                    {totalClasses && Math.floor((classesAttended / totalClasses) * 100) < 75 ? (
                        <TriangleAlertIcon className={'stroke-red-500'} />
                    ) : (
                        <></>
                    )}
                </CardAction>
            </CardHeader>
            <CardContent>
                <div className={'flex justify-between items-baseline'}>
                    <p className={'text-xl'}>
                        {totalClasses && Math.floor((classesAttended / totalClasses) * 100)}%
                    </p>
                    <p
                        className={'text-muted-foreground'}
                    >{`Attended: ${classesAttended}/${totalClasses}`}</p>
                </div>
                <Progress
                    progressColor={
                        totalClasses && Math.floor((classesAttended / totalClasses) * 100) >= 75
                            ? 'bg-green-500'
                            : 'bg-red-500'
                    }
                    className={
                        totalClasses && Math.floor((classesAttended / totalClasses) * 100) >= 75
                            ? 'bg-green-500/50'
                            : 'bg-red-500/50'
                    }
                    value={
                        totalClasses > 0 ? Math.floor((classesAttended / totalClasses) * 100) : 0
                    }
                />
            </CardContent>
        </Card>
    );
};

export default SubjectOverviewCard;
