<?php
namespace App\Services;

use App\Models\Project;
use App\Models\Image;
use Illuminate\Http\UploadedFile;
use Intervention\Image\Facades\Image as InterventionImage;
use Illuminate\Support\Facades\File;

class ProjectService{
    
    public function store($data){
        print_r($data);
        // $project = new Project();
        // $project->title = $data['title'];
        // $project->description = $data['description'];
        // $project->year = $data['year'];
        // $project->save();
        $project = Project::create($data);
        foreach ($data['images'] as $imageData) {
                $image = new Image();
                $imagePath = $this->storeImage($imageData, $project->title);
                $image->project_id = $project->id;
                $image->file_path = $imagePath;
                $image->save();
            }     
        return $project;
    }

    public function updateProject($id, array $data){
        $project = $this->getProject($id);
        if(!$project){
            return null;
        }
        $project->fill($data);
        $project->save();
        if(isset($data['images'])){
        foreach ($data['images'] as $imageData) {
            $image = new Image();
            $imagePath = $this->storeImage($imageData, $project->title);
            $image->project_id = $project->id;
            $image->file_path = $imagePath;
            $image->save();
        }    
        }
        return $project;
    }
    public function storeImage($image, $projectTitle) {
        $originalName = pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME);
        $imageName = $originalName . '_' . time() . '.webp';
        $optimizedImage = InterventionImage::make($image)->encode('webp', 50);
        $directory = 'images/projects/' . $projectTitle;
        if (!file_exists($directory)) {
            mkdir($directory, 775, true);
        }
        $optimizedImage->save(public_path('images/projects') .'/' . $projectTitle . '/' . $imageName);
        return '/images/projects/'. $projectTitle .'/'. $imageName; // 
    }
    public function getProjectImages($id){  
        $images =  Image::where('project_id', $id)->get();
        return $images;
    }
    public function destroyImage($id){
        $image = Image::findOrFail($id);
        echo $image->id;
        $image->delete();
        if (File::exists(public_path($image->file_path))) {
            // Delete the image file from the public folder
            File::delete(public_path($image->file_path));
        }
    }
    public function getProject($id){
        return Project::find($id);
    }

}