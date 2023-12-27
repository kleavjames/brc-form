export type Districts = {
  name: string;
  subdistrict: {
      key: string;
      value: string;
  }[];
}

export enum Gender {
  Male = 'M',
  Female = 'F',
}

export enum Status {
  Married = 'married',
  Single = 'single',
  Divorced = 'divorced',
  Widowed = 'widowed'
}

export enum District {
  One = 'd1',
  Two = 'd2',
  Three = 'd3'
}