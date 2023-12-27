export type Districts = {
  name: string;
  subdistrict: {
      key: string;
      value: string;
  }[];
}

export type PersonalInformation = {
  firstName: string;
  lastName: string;
  middleName: string;
  birthdate: Date | null | undefined;
  gender: Gender;
  status: Status;
  address: string;
  district: string;
  barangay: string;
  city: string;
  region: string;
}

export type ChurchInformation = {
  networkHead: string;
  leadershipLevel: string;
  divineAppointmentDate: Date | null | undefined;
}

export type VotersInformation = {
  isRegistered: boolean;
  precinctId: string | null;
  district: string | null;
  barangay: string | null;
  city: string | null;
  region: string | null;
}

export type Barangays = {
  [name: string]: [{
    key: string,
    value: string,
    district: number
  }]
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

export enum LeadershipLevel {
  SeniorPastor = 'seniorpastor',
  NetworkHead = 'networkhead',
  TwoEightEight = '288',
  ThreeFourFiveSix = '3456',
  TwentyK = '20K',
  Multitudes = 'multitudes',
  NetworkChurch = 'networkchurch',
  Visitors = 'visitors',
}