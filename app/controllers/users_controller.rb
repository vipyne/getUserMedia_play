class UsersController <ApplicationController

  def index
    github = Github.new login:'vipyne', password: ENV["GITHUB_PASSWORD"]
    @bam = github.repos.commits.all  'vipyne', 'getVoteText_play'
    # @bam = github.activity.events.issue  'vipyne', 'getUserMedia_play'
  end

end