<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Project\StoreProjectRequest;
use App\Http\Requests\Project\UpdateProjectRequest;
use App\Http\Resources\V1\ProjectCollection;
use App\Http\Resources\V1\ProjectResource;
use App\Models\Project;
use App\Models\Image;
use App\Services\ProjectService;
use Illuminate\Http\JsonResponse;


class ProjectController extends Controller
{
    protected ProjectService $projectService;
    public function __construct(ProjectService $projectService)
    {
        $this->projectService = $projectService;
    }
    /**
     * Retrieves a paginated collection of projects with their ID, title, description, and year.
     *
     * @return JsonResponse The JSON response containing the paginated collection of projects or an error message.
     */
    public function index() : JsonResponse
    {
        try {
            $projects = Project::select('id', 'title', 'description', 'year')->paginate(10);
            
            if ($projects->isEmpty()) {
                return response()->json(['message' => 'No projects found.'], 404);
            }
            return response()->json([
            'data'=> new ProjectCollection($projects)],200);
            
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to retrieve projects.', 'error' => $e->getMessage()], 500);
        }
    }
    /**
     * Retrieves a project and its associated images by ID.
     *
     * @param Project $project The project to retrieve.
     * 
     * @throws \Exception If an error occurs while retrieving the project.
     * @return JsonResponse The JSON response containing the project and its images.
    */
    public function show(Project $project) : JsonResponse
    {   
        try {
            $project->load('images'); // Eager load the 'images' relationship if needed
            
            if (!$project) {
                return response()->json(['message' => 'No projects found.'], 404);
            }

            return response()->json([
                'data' => new ProjectResource($project), // Use ProjectResource to format the project data
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve projects.', 
                'error' => $e->getMessage()
            ], 500);
        }

    }
    /**
     * Store a new project.
     *
     * @param StoreProjectRequest $request The request containing the project data.
     * 
     * @return JsonResponse The JSON response containing the newly created project or an error message..
    */
    public function store(StoreProjectRequest $request) : JsonResponse
    {
        try{
        // $project = $this->projectService->store($request->validated());
        return response()->json([
            // 'data' => new ProjectResource($project),
            'data' => "200"
        ]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to store project.', 'error' => $e->getMessage()], 500);
        }  
    }
    /**
     * Updates a project with the given ID using the validated request data.
     *
     * @param Project $project The project object to update.
     * @param UpdateProjectRequest $request The request containing the updated project data.
     * @return JsonResponse The JSON response containing the updated project data or an error message.
     */
    public function update(Project $project, UpdateProjectRequest $request) : JsonResponse
    { 
        try{
            // $project = $this->projectService->updateProject($project->id, $request->validated());
            // $project->load('images');
            // if(!$project){
            //     return response()->json([
            //         'message' => 'Project not found',
            //     ], 404);
            // }
            return response()->json([
                // 'data' => new ProjectResource($project),
                'data' => 200
            ], 200);
        }catch(\Exception $e){
            
            return response()->json([
                'message' => 'Error while updating project',
                'error' => $e->getMessage(),
            ], 500);
        }   
    }
    /**
     * Deletes a project by its ID.
     *
     * @param int $id The ID of the project to delete.
     * @throws \Exception If the project could not be deleted.
     * @return void
     */
    public function destroy(Project $project): \Illuminate\Http\JsonResponse
    {
        try {
            $project = Project::destroy($project->id);
            if(!$project){
                return response()->json([
                    'message' => 'Project not found',
                ], 404);
            }
            return response()->json([
                'message'=>'Project deleted successfully',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error while deleting project',
            ], 400);
        }
    }
    /**
    * Deletes an image.
    *
    * @param Image $image The image to be deleted.
    * @throws \Exception If there is an error while deleting the image.
    * @return JsonResponse The JSON response containing the success message or error message.
    */
    public function destroyImage(Image $image) 
    {
        try{
            $image = $this->projectService->destroyImage($image->id);
            if(!$image){
                return response()->json([
                    'message' => 'Image not found',
                ], 404);
            }
            return response()->json([
                'message'=>'Image deleted successfully',
            ], 200);

        }catch(\Exception $e){
            return response()->json([
                'message' => 'Error while deleting image',
                'error' => $e->getMessage(),
            ], 500);
        }

    }
}
