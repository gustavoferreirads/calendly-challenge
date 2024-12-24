import React from 'react';
import clsx from 'clsx';
import Form from "@/components/Form";
import Input from '@/components/Input';
import Button from '@/components/Button';
import { strings } from '@/const/strings';
import { Schedule } from "../types/schedule";

type ScheduleFormProps = {
  onSubmit: (data: Schedule) => void;
  defaultValues: Schedule;
};

const ScheduleForm = ({ onSubmit, defaultValues }: ScheduleFormProps) => (
    <Form<Schedule> onSubmit={(values) => onSubmit({ ...values })} defaultValues={defaultValues} className="space-y-6rounded-lg">
      {() => (
          <div
              className={clsx(
                  'w-full flex flex-col gap-4',
                  'lg:min-w-[420px]',
                  'min-w-[calc(90vw-48px)]'
              )}
          >
            <Input name="name" label={strings.name} required />
            <Input name="email" label={strings.email} required />

            <div className="flex space-x-4 mt-4">
              <Button type="submit">{strings.scheduleEvent}</Button>
            </div>
          </div>
      )}
    </Form>
);

export default ScheduleForm;
