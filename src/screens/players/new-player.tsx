import { useCreatePlayer } from "@/hooks/players/use-create-player";
import { useForm, SubmitHandler } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useGetAllTeams } from "@/hooks/teams/use-get-all-teams";

interface FormProps {
  name: string;
  age: number;
  height: number;
  weight: number;
  position: string;
  league: string;
  team_id: string;
}

export default function NewPlayer() {
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormProps>();

  const watchLeague = watch("league");

  const { mutate: createPlayer, isPending } = useCreatePlayer();

  const { data: teams, refetch } = useGetAllTeams(getValues("league"));

  const onSubmit: SubmitHandler<FormProps> = (data: FormProps) => {
    createPlayer(data);
  };

  useEffect(() => {
    refetch();
  }, [watchLeague, refetch]);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-medium">Crie um novo jogador</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center gap-3">
          <fieldset className="flex w-full flex-col gap-1">
            <label htmlFor="name" className="text-sm font-medium uppercase">
              Nome
              <span className="ml-1 text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              placeholder="Nome"
              className="w-full rounded border px-4 py-2 outline-none"
              {...register("name", { required: "Campo obrigatório" })}
            />
            {errors.name?.type === "required" && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </fieldset>

          <fieldset className="flex w-full flex-col gap-1">
            <label htmlFor="age" className="text-sm font-medium uppercase">
              Idade
              <span className="ml-1 text-red-500">*</span>
            </label>
            <input
              type="text"
              id="age"
              placeholder="Idade"
              className="w-full rounded border px-4 py-2 outline-none"
              {...register("age", { required: "Campo obrigatório" })}
            />
            {errors.age?.type === "required" && (
              <p className="text-xs text-red-500">{errors.age.message}</p>
            )}
          </fieldset>
        </div>

        <div className="flex items-center gap-3">
          <fieldset className="flex w-full flex-col gap-1">
            <label htmlFor="height" className="text-sm font-medium uppercase">
              Altura
              <span className="ml-1 text-red-500">*</span>
            </label>
            <input
              type="text"
              id="height"
              placeholder="Altura"
              className="w-full rounded border px-4 py-2 outline-none"
              {...register("height", { required: "Campo obrigatório" })}
            />
            {errors.height?.type === "required" && (
              <p className="text-xs text-red-500">{errors.height.message}</p>
            )}
          </fieldset>

          <fieldset className="flex w-full flex-col gap-1">
            <label htmlFor="weight" className="text-sm font-medium uppercase">
              Peso
              <span className="ml-1 text-red-500">*</span>
            </label>
            <input
              type="text"
              id="weight"
              placeholder="Peso"
              className="w-full rounded border px-4 py-2 outline-none"
              {...register("weight", { required: "Campo obrigatório" })}
            />
            {errors.weight?.type === "required" && (
              <p className="text-xs text-red-500">{errors.weight.message}</p>
            )}
          </fieldset>
        </div>

        <div className="flex items-center gap-3">
          <fieldset className="flex w-full flex-col gap-1">
            <label htmlFor="position" className="text-sm font-medium uppercase">
              Posição
              <span className="ml-1 text-red-500">*</span>
            </label>
            <Select
              onValueChange={(value) =>
                setValue("position", value, { shouldValidate: true })
              }
              {...register("position", { required: "Campo obrigatório" })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Posição" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PG">PG - Armador</SelectItem>
                <SelectItem value="SG">SG - Ala Armador</SelectItem>
                <SelectItem value="SF">SF - Ala</SelectItem>
                <SelectItem value="PF">PF - Ala Pivô</SelectItem>
                <SelectItem value="C">C - Pivô</SelectItem>
              </SelectContent>
            </Select>
            {errors.position?.type === "required" && (
              <p className="text-xs text-red-500">{errors.position.message}</p>
            )}
          </fieldset>

          <fieldset className="flex w-full flex-col gap-1">
            <label htmlFor="league" className="text-sm font-medium uppercase">
              Liga
              <span className="ml-1 text-red-500">*</span>
            </label>
            <Select
              onValueChange={(value) =>
                setValue("league", value, { shouldValidate: true })
              }
              {...register("league", { required: "Campo obrigatório" })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Liga" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NBA">NBA</SelectItem>
                <SelectItem value="WNBA">WNBA</SelectItem>
              </SelectContent>
            </Select>
            {errors.league && (
              <p className="text-xs text-red-500">{errors.league.message}</p>
            )}
          </fieldset>
        </div>
        <fieldset className="flex w-full flex-col gap-1">
          <label htmlFor="team" className="text-sm font-medium uppercase">
            Time
            <span className="ml-1 text-red-500">*</span>
          </label>
          <Select
            disabled={!watchLeague}
            onValueChange={(value) =>
              setValue("team_id", value, { shouldValidate: true })
            }
            {...register("team_id", { required: "Campo obrigatório" })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Time" />
            </SelectTrigger>
            <SelectContent>
              {teams?.map((team) => (
                <SelectItem key={team.id} value={team.id}>
                  {team.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.team_id && (
            <p className="text-xs text-red-500">{errors.team_id.message}</p>
          )}
        </fieldset>
        <div className="flex items-center justify-end gap-3">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Criando..." : "Criar jogador"}
          </Button>
        </div>
      </form>
    </div>
  );
}
