import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Staff, StaffDocument } from './schemas/staff.schema';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { CloudinaryService } from 'src/common/cloudinary/cloudinary.service';
@Injectable()
export class StaffService {
  constructor(
    @InjectModel(Staff.name) private staffModel: Model<StaffDocument>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(createStaffDto: CreateStaffDto, file?: Express.Multer.File) {
    const { skills, ...rest } = createStaffDto;

    const staffData: any = {
      ...rest,
      skills: [],
    };

    if (skills) {
      try {
        staffData.skills = JSON.parse(skills);
      } catch (err) {
        throw new BadRequestException('Invalid skills format');
      }
    }

    if (file) {
      const uploaded = await this.cloudinaryService.uploadImage(file);
      staffData.avatarUrl = uploaded.secure_url;
    }

    return this.staffModel.create(staffData);
  }

  async findAll(): Promise<Staff[]> {
    return this.staffModel.find().exec();
  }

  async findOne(id: string): Promise<Staff> {
    const staff = await this.staffModel.findById(id).exec();
    if (!staff) {
      throw new NotFoundException(`Staff with ID ${id} not found`);
    }
    return staff;
  }

  async update(
    id: string,
    updateStaffDto: UpdateStaffDto,
    file?: Express.Multer.File,
  ) {
    const { skills, ...rest } = updateStaffDto;

    const updatedData: any = {
      ...rest,
    };

    if (skills) {
      try {
        updatedData.skills = JSON.parse(skills);
      } catch (err) {
        throw new BadRequestException('Invalid skills format');
      }
    }

    if (file) {
      const uploaded = await this.cloudinaryService.uploadImage(file);
      updatedData.avatarUrl = uploaded.secure_url;
    }

    return this.staffModel.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.staffModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Staff with ID ${id} not found`);
    }
  }
}
