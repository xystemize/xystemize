import { BadRequestException } from '@nestjs/common';
import { AppBaseDataModel } from '@xystemize/app-core';

export const transformData = <T extends { new (...args: unknown[]): InstanceType<T> & AppBaseDataModel }>({
  classModel: ClassModel,
}: {
  classModel: T;
}) => {
  const func = (value: unknown) => {
    const data = new ClassModel(value as typeof ClassModel);

    if (data.isNotValid) {
      throw new BadRequestException();
    }

    return data;
  };

  return func;
};
